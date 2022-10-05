import Intro from "./components/intro/intro";
import About from "./components/about/About";
import NavbarFile from "./components/Navbar/NavbarFile";
import Fade from 'react-reveal/Fade';

const App = () => {
    return <div>
        <NavbarFile/>
        <Intro/>
        <About/>
    </div>;
};

export default App;