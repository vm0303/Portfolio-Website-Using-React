import {Component, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import {HashLink as Link} from "react-router-hash-link";
import "./Navbar.css"

class NavbarFile extends Component {



    render()
    {
        return (
            <div>
                    <BrowserRouter>
                        <nav id="navigation" className="navbar">
                            <div className="wrapper">
                                <ul className="main-nav" id="link_menu">
                                    <li>
                                        <a>
                                            <Link to='#aboutMe' smooth>
                                                About
                                            </Link>
                                        </a>
                                    </li>

                                    <li>
                                        <a>
                                            <Link to='#projs' smooth>
                                                Projects
                                            </Link>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <Link to='#resume' smooth>
                                                Resume
                                            </Link>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <Link to='#contact' smooth>
                                                Contact
                                            </Link>
                                        </a>
                                    </li>
                                </ul>
                                <ul className="social_media_links" id="link_menu">
                                    <li><a className="icons" href="https://github.com/vm0303" target="_blank"
                                           rel="noopener noreferrer" title="Github Page"><i
                                        className="fa-brands fa-github"></i></a></li>
                                    <li><a className="icons" href="https://www.instagram.com/vmadhav33/" target="_blank"
                                           title="Instagram Page"><i className="fa-brands fa-instagram"></i></a>
                                    </li>
                                    <li><a className="icons" href="https://www.linkedin.com/in/vishal-madhav/"
                                           target="_blank" title="LinkedIn Page"><i
                                        className="fa-brands fa-linkedin"></i></a>
                                    </li>
                                </ul>

                                {/*       <div id="mobile">
                            <i id="hamburger" >
                            </i>
                        </div>*/}
                            </div>
                        </nav>

                    </BrowserRouter>


            </div>

        );
    }
}


export default NavbarFile;