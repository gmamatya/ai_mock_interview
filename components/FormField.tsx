import React from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
  type?: "text" | "email" | "password" | "file"
}

const FormField = ({ control, name, label, placeholder, type = "text" }: FormFieldProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>
        <FormControl>
          {/* has to be current-password when sign in, fix later */}
          {type === "password"
            ? (
              <Input
                placeholder={placeholder}
                type={type}
                className="input"
                {...field}
              />
            )
            : name === "email"
            ? <Input placeholder={placeholder} type={type} className="input" {...field} autoComplete="username" />
            : <Input placeholder={placeholder} type={type} className="input" {...field} />}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export default FormField
