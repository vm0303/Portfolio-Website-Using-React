import Intro from "./components/Intro/Intro";
import About from "./components/about/About";
import Navbar from "./components/Navbar/Navbar";
import ProjectList from "./components/ProjectList/ProjectList";
import Contact from "./components/contact/Contact";
import {createContext, useState} from "react";

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
    const [modalOpen, setModalOpen] = useState(false);
    const toggleTheme = () => {
        setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
    }
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>

            <div className="app" id={theme}>
                <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} modalOpen={modalOpen}/>
                <SideMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
                <Intro/>
                <About/>
                <ProjectList/>
                <Contact setMenuOpen={setMenuOpen}/>
                <Fade effect="fade" delay={800}>
                    <div className="toggle-switch">
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

                                uncheckedIcon={
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "100%",
                                            paddingRight: 2
                                        }}
                                    >
                                        <img src={sunPic} title="Sun icon by Icons8"
                                             className="toggle-icon"
                                             alt="An image of the sun from Icons8.com"/>
                                    </div>
                                }
                                checkedIcon={
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "100%",
                                            paddingRight: 2
                                        }}
                                    >
                                        <img src={moonPic}
                                             title="Moon icon by Icons8"
                                             className="toggle-icon"
                                             alt="An image of the moon from Icons8.com"/>
                                    </div>
                                }
                                className="react-switch"
                                id="icon-switch"
                            />
                        </label>
                    </div>
                </Fade>

            </div>
        </ThemeContext.Provider>
    )
}

export default App;