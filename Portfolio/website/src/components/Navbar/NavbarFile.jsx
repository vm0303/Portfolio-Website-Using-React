import {HashLink as Link} from "react-router-hash-link";
import "./Navbar.css"
import {BrowserRouter} from "react-router-dom";
import {Fade} from "react-reveal";
import {Component} from "react";
import $ from 'jquery';


class NavbarFile extends Component
{

    constructor(props)
    {
        super(props);
    }
    componentDidMount = () =>
    {
            $(".toggle i").click(function ()
            {
                $("ul").toggleClass("show");
            });
    }


    render() {
        return (
            <>

                <Fade effect="fade" delay={500}>
                    <nav>

                        <label className="toggle">
                            <i className="fa regular fa-bars"></i>
                        </label>
                        <BrowserRouter>
                            <ul className="nav_links">
                                <li>
                                    <a>
                                        <Link to='#intro' smooth>
                                            Intro
                                        </Link>
                                    </a>
                                </li>
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
                        </BrowserRouter>
                        <div className="social_media">
                            <a href="https://github.com/vm0303" target="_blank"
                               rel="noopener noreferrer" title="Github Page"><i
                                className="fa-brands fa-github"></i></a>
                            <a href="https://www.instagram.com/vmadhav33/" target="_blank"
                               title="Instagram Page"><i className="fa-brands fa-instagram"></i></a>

                            <a href="https://www.linkedin.com/in/vishal-madhav/"
                               target="_blank" title="LinkedIn Page"><i
                                className="fa-brands fa-linkedin"></i></a>

                        </div>
                    </nav>
                </Fade>


            </>
        );

    }
}



export default NavbarFile;