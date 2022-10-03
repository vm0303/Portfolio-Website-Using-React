import "./about.css";
import pic from "../../image/about_me.jpg";
import Fade from 'react-reveal/Fade';


const About = () =>
{
    return (

        <div className="about" id="aboutMe">

                <div className="about-left">
                    <div className="a-card background"></div>
                    <div className="a-card">
                        <img
                            src={pic}
                            alt=""
                            className="about-img"
                        />
                    </div>
                </div>

                <div className="about-right">
                        <h1 className="about-title">About Me</h1>
                        <h3 className="about-sub-title">
                            "The road to success and the road to failure are almost exactly the same." — Colin R. Davis
                        </h3>
                        <p className="about-description">
                            Since high school, my love for coding started to grow into a wonderful passion, because I was always in awe on how
                            it could transform various ideas, solutions, and instructions into a programming language that the
                            computer can understand. In addition to this, it helped shape my skills in problem-solving and analysis,
                            such as finding errors efficiently or thinking about a program logically.
                        </p>
                </div>



        </div>

    );
};

export default About;





