import Intro from "./components/Intro/Intro";
import About from "./components/About/About";
import Navbar from "./components/Navbar/Navbar";
import ProjectList from "./components/ProjectList/ProjectList";
import Contact from "./components/Contact/Contact";
import {createContext, useEffect, useState} from "react";
import Popup from 'reactjs-popup';

import SideMenu from "./components/SideMenu/SideMenu";
import Switch from "react-switch";
import "./App.css"
import sunPic from "./image/theSun.png";
import moonPic from "./image/theMoon.png";
import {Fade} from "react-reveal";

export const ThemeContext = createContext(null);

function App() {
    const [theme, setTheme] = useState("light");
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    const toggleTheme = () => {
        setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 768); // Adjust the breakpoint as per your design
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Call the function once to initialize

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <div className="app" id={theme}>
                <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
                <SideMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
                <Intro/>
                <About/>
                <ProjectList/>
                <Contact menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
                <Fade effect="fade" delay={800}>
                    <div className="toggle-switch">
                        <Popup
                            trigger={
                                <label htmlFor="icon-switch">
                                    <Switch
                                        checked={theme === "dark"}
                                        onChange={toggleTheme}
                                        offHandleColor="#245fc6"
                                        onHandleColor="#22b255"
                                        offColor="#0d97d0"
                                        onColor="#53d882"
                                        width={50}
                                        height={25}
                                        uncheckedIcon={<img src={sunPic} title="Sun icon by Icons8"
                                                            className="toggle-icon"
                                                            alt="An image of the sun from Icons8.com"/>}
                                        checkedIcon={<img src={moonPic} title="Moon icon by Icons8"
                                                          className="toggle-icon"
                                                          alt="An image of the moon from Icons8.com"/>}
                                        className="react-switch"
                                        id="icon-switch"
                                    />
                                </label>
                            }
                            position={isMobileView ? "left top" : "left top"}
                            on={isMobileView ? "click" : "hover"} // Change the 'on' prop based on mobile view
                            arrow={true} // Ensure the arrow is shown
                            arrowStyle={{color: theme === "dark" ? "#22b255" : "#235fc8"}} // Set color based on theme
                        >
                            <div className={`tooltip ${theme === "light" ? "light-tooltip" : "dark-tooltip"}`}>
                                {theme === "light" ? "Light" : "Dark"} mode
                            </div>
                        </Popup>
                    </div>
                </Fade>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;