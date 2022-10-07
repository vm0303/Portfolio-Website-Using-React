import "./intro.css"
import pic from "../../image/Intro.png"
import {init} from 'ityped'
import Fade from 'react-reveal/Fade';


import {useEffect, useRef} from "react";


const Intro = () => {
    const textRef = useRef();
    useEffect(() => {
        init(textRef.current,
            {
                showCursor: true,
                backDelay: 1200,
                strings: ["playing video games.", "watching sports.", "reading books.", "traveling.", "biking.",
                    "eating/dining at various cuisines or restaurants.", "hiking.", "watching movies/TV shows. "],
            })
    }, []);
    return (

        <div className="Intro" id="introduce">
            <Fade effect="fade" delay={1350}>
                <div className="i-left_side">

                    <div className="i-left_side_wrapper">
                        <h2 className="i-greeting">Hello! I'm</h2>
                        <h1 className="i-name">Vishal Madhav.</h1>

                        <div className="i-titles">
                            <div className="i-title-item">I'm learning to be a Full-Stack Developer</div>
                        </div>
                        <br/>
                        <p className="i-desc">
                            I am a recent Computer Science undergraduate, and an upcoming full-stack developer.
                        </p>
                        <br/>
                        <div className="i-hobbies">
                            My favorite hobbies include <span ref={textRef}></span>
                        </div>
                    </div>

                    <svg viewBox="0 0 95 95" className="arrows">
                        <path className="a1" d="M0 0 L30 32 L60 0"></path>
                        <path className="a2" d="M0 20 L30 52 L60 20"></path>
                        <path className="a3" d="M0 40 L30 72 L60 40"></path>
                    </svg>

                </div>
            </Fade>
            <Fade effect="fade" delay={1100}>
                <div className="i-right_side">
                    <div className="imgContainer">
                    <div className="i-background"></div>
                    <img src={pic} alt="" className="i-img"></img>
                    </div>
                </div>

            </Fade>
        </div>

    )
}
export default Intro;

