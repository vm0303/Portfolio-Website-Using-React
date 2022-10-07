import "./about.css";
import pic from "../../image/about_me.jpg";
import {Fade} from "react-reveal";




const About = () =>
{
    return (

        <div className="about" id="about">
            <Fade effect="fade" delay={800}>
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
            </Fade>

            <Fade effect="fade" delay={1100}>
                <div className="about-right">
                        <h1 className="about-title">About Me</h1>
                        <h3 className="about-sub-title">
                            "Great things come from hard work and perseverance. No excuses." -Kobe Bryant
                        </h3>

                        <p className="about-description">
                            Since high school, I always had this passion to be a programmer, because I would be
                            creating these various applications and services that can benefit people in their
                            day-to-day lives. Whether it's something entertaining like a game, crucial like a
                            full-scale algorithm, or formal like a software service for a company,
                            I feel joyful and satisfied that my work is benefiting millions of people around the world.
                        </p>


                </div>
            </Fade>
        </div>


    );
};

export default About;





