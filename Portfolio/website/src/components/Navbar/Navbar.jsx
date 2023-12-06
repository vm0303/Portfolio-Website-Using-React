import "./Navbar.css"
import {Fade} from "react-reveal";

export default function Navbar({menuOpen, setMenuOpen, modalOpen}) {
    const handleHamburgerClick = modalOpen ? null : () => setMenuOpen(!menuOpen);
    return (
        <Fade effect="fade" delay={700}>
            <div className={"navbar " + (menuOpen && "active")}>
                <div className="wrapper">
                    <div className="left">
                        <div className={`hamburger ${modalOpen ? 'disabled' : ''}`} onClick={handleHamburgerClick}>
                            <span className="line1"></span>
                            <span className="line2"></span>
                            <span className="line3"></span>
                        </div>
                    </div>
                    <div className="right">
                        <div className={`social_media_Container ${modalOpen ? 'disabled' : ''}`}>
                            <a className={`icon ${modalOpen ? 'disabled' : ''}`} href="https://github.com/vm0303"
                               target="_blank"
                               rel="noopener noreferrer" title="Github Page"><i
                                className="fa-brands fa-github"></i></a>
                        </div>
                        <div className={`social_media_Container ${modalOpen ? 'disabled' : ''}`}>
                            <a className="icon" href="https://www.instagram.com/vmadhav33/" target="_blank"
                               title="Instagram Page"><i className="fa-brands fa-instagram"></i></a>
                        </div>
                        <div className={`social_media_Container ${modalOpen ? 'disabled' : ''}`}>
                            <a className="icon" href="https://www.linkedin.com/in/vishal-madhav/"
                               target="_blank" title="LinkedIn Page"><i
                                className="fa-brands fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>

    )

}