import "./Intro.css";
import {init} from 'ityped'
import pic from "../../image/Intro.png"
import Fade from 'react-reveal/Fade';
import {useEffect, useRef, useState} from "react";


const FADE_INTERVAL_MS = 1650;
const WORD_CHANGE_INTERVAL_MS = FADE_INTERVAL_MS * 2;
const WORDS_TO_ANIMATE = ['Web Developer', 'Cloud Practitioner', 'Software Developer'];

const Intro = () => {
    const [fadeProp, setFadeProp] = useState({fade: 'fading-in'});
    const [wordOrder, setWordOrder] = useState(0);

    useEffect(() => {
        const fadeTimeout = setInterval(() => {
            setFadeProp((prevFadeProp) => ({
                fade: prevFadeProp.fade === 'fading-in' ? 'fading-out' : 'fading-in',
            }));
        }, FADE_INTERVAL_MS);

        return () => clearInterval(fadeTimeout);
    }, []);

    useEffect(() => {
        const wordTimeout = setInterval(() => {
            setWordOrder((prevWordOrder) => (prevWordOrder + 1) % WORDS_TO_ANIMATE.length);
        }, WORD_CHANGE_INTERVAL_MS);

        return () => clearInterval(wordTimeout);
    }, []);
    const textRef = useRef();
    useEffect(() => {
        init(textRef.current,
            {
                showCursor: true,
                backDelay: 1500,
                // "hiking.", "coding.", "working out.", "shopping." "playing video games.", "watching sports.", "reading books.", "traveling.",
                strings: ["watching movies or TV shows.", "riding my bike.", "playing video games.", "shopping.", "coding."],
            })
    }, []);


    return (

        <div className="intro" id="home">
            <Fade effect="fade" delay={1000}>
                <div className="i-left_side">
                    <div className="i-left_side_wrapper">
                        <h2 className="i-greeting">Hello! My name is</h2>
                        <h1 className="i-name">Vishal Madhav</h1>
                        <div className="i-title">
                            <div className="i-title-wrapper">
                                <div className="i-title-item">
                                    <span className={fadeProp.fade}>{WORDS_TO_ANIMATE[wordOrder]}</span>
                                </div>
                            </div>
                        </div>
                        <p className="i-desc">
                            I specialize in developing precise and user-friendly web applications, while having an
                            expertise in back-end technologies such as Oracle Database Management, SQL queries,
                            the Spring Framework, and more. In addition, my proficiency in AWS, which includes cloud
                            architecture, serverless computing, data analytics, and security, drives innovation and
                            efficiency for businesses in the digital landscape.
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
            <Fade effect="fade" delay={1200}>
                <div className="i-right_side">
                    <div className="imgContainer">
                    <div className="i-background"></div>
                    <img src={pic} alt="" className="i-img"></img>
                    </div>
                </div>
            </Fade>
        </div>
    );
};

export default Intro;

