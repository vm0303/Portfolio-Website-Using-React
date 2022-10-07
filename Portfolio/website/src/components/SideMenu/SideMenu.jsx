import "./sideMenu.css"
import {HashLink as Link} from "react-router-hash-link";
import {BrowserRouter} from "react-router-dom";

export default function SideMenu({menuOpen, setMenuOpen})
{
    return(

        <BrowserRouter>
        <div className={"side_menu " + (menuOpen && "active")}>
            <ul>
                <li onClick={() => setMenuOpen(false)}>
                    <a>
                        <Link to='#introduce' smooth>
                            Home
                        </Link>
                    </a>
                </li>
                <li onClick={() => setMenuOpen(false)}>
                    <a>
                        <Link to='#about' smooth>
                            About
                        </Link>
                    </a>
                </li>

                <li onClick={() => setMenuOpen(false)}>
                    <a>
                        <Link to='#projs' smooth>
                            Projects
                        </Link>
                    </a>
                </li>
                <li onClick={() => setMenuOpen(false)}>
                    <a>
                        <Link to='#contact' smooth>
                            Contact
                        </Link>
                    </a>
                </li>
            </ul>
        </div>
        </BrowserRouter>

    )
}