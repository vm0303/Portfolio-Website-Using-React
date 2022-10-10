import Intro from "./components/intro/Intro";
import About from "./components/about/About";
import NavbarFile from "./components/Navbar/NavbarFile";
import ProjectList from "./components/ProjectList/projectList";
import Contact from "./components/contact/Contact";
import {useState} from "react";
import SideMenu from "./components/SideMenu/SideMenu";


function App()
{
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <div className="app">
            <NavbarFile menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            <SideMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        <div className="sections">
            <Intro/>
            <About/>
            <ProjectList/>
            <Contact/>
        </div>
        </div>
)
}

export default App;