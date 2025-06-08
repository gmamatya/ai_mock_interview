import React from "react"
import { AiFillLinkedin } from "react-icons/ai"

const Footer = () => {
  return (
    <div className="footer-container">
      <p>&copy; {new Date().getFullYear()} Gaurav Amatya | All rights reserved.</p>
      <p className="icons">
        <a target="_blank" href="https://linkedin.com/in/gauravamatya" rel="noopener noreferrer">
          <button type="button" className="footer-btn" title="LinkedIn">
            <AiFillLinkedin size={30} />
          </button>
        </a>
        {
          /* <a target="_blank" href="https://github.com/gmamatya" rel="noopener noreferrer">
                    <button type="button" className='footer-btn' title='Github'><AiOutlineGithub size={30} /></button>
                </a> */
        }
      </p>
    </div>
  )
}

export default Footer
