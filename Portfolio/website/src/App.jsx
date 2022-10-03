import Intro from "./components/intro/intro";
import About from "./components/about/About";
import NavbarFile from "./components/Navbar/NavbarFile";
import Fade from "react-reveal/Fade";

const App = () => {
    return <div>
        <Fade effect="fade" delay={500}>
        <NavbarFile/>
        <Intro/>
        <About/>
        </Fade>
    </div>;
};

export default App;