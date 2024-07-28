import React, {createContext, useEffect, useState} from "react";
import Popup from 'reactjs-popup';
import Intro from "./components/Intro/Intro";
import About from "./components/About/About";
import Navbar from "./components/Navbar/Navbar";
import ProjectList from "./components/ProjectList/ProjectList";
import Contact from "./components/Contact/Contact";
import SideMenu from "./components/SideMenu/SideMenu";
import Switch from "react-switch";
import "./App.css";
import sunPic from "./image/theSun.png";
import moonPic from "./image/theMoon.png";
import {Fade} from "react-reveal";

export const ThemeContext = createContext(null);

function App() {
    const [theme, setTheme] = useState("light");
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [isIpadView, setIsIpadView] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);

    const toggleTheme = () => {
        setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // List of mobile landscape viewport ranges to exclude
            const excludedRanges = [
                {minWidth: 800, maxWidth: 808, minHeight: 310, maxHeight: 414},
                {minWidth: 725, maxWidth: 811, minHeight: 310, maxHeight: 393},
                {minWidth: 712, maxWidth: 812, minHeight: 300, maxHeight: 375},
                {minWidth: 830, maxWidth: 926, minHeight: 350, maxHeight: 428},
                {minWidth: 810, maxWidth: 932, minHeight: 370, maxHeight: 430}
            ];

            const isExcluded = excludedRanges.some(range =>
                width >= range.minWidth && width <= range.maxWidth &&
                height >= range.minHeight && height <= range.maxHeight
            );

            setIsMobileView(width <= 932);
            setIsIpadView(width > 430 && width <= 1024 && !isExcluded);
            setIsLandscape(width > height && width <= 1024);
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const switchProps = isIpadView
        ? {
            width: isLandscape ? 85 : 80,
            height: isLandscape ? 40 : 40,
            handleDiameter: isLandscape ? 30 : 40,
        }
        : {
            width: 55,
            height: 25,
            handleDiameter: 25,
        };

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
                                        uncheckedIcon={<img src={sunPic} title="Sun icon by Icons8"
                                                            className="sun-toggle-icon"
                                                            alt="An image of the sun from Icons8.com"/>}
                                        checkedIcon={<img src={moonPic} title="Moon icon by Icons8"
                                                          className="moon-toggle-icon"
                                                          alt="An image of the moon from Icons8.com"/>}
                                        className="react-switch"
                                        id="icon-switch"
                                        {...switchProps}
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
