import React from 'react';
import "./About.css";
import pic from "../../image/about_me.jpg";
import {Fade} from "react-reveal";
import resume from "../../assets/Vishal-Madhav-Resume 2024.pdf";

const About = () => {
    return (
        <div className="about" id="about">
            <Fade effect="fade" delay={700}>
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

            <Fade effect="fade" delay={800}>
                <div className="about-right">
                    <h1 className="about-title">About Me</h1>
                    <h3 className="about-sub-title">
                        "Great things come from hard work and perseverance. No excuses." -Kobe Bryant
                    </h3>

                    <p className="about-description">
                        My passion for coding began early, inspiring me to specialize in creating user-friendly
                        solutions for both front-end and back-end development. Through academic projects and a
                        variety of professional roles, I have refined my skills to consistently deliver robust
                        solutions and stay ahead of any new trends in the industry. Furthermore, learning and earning
                        the AWS Cloud Practitioner certification has further enhanced my ability to provide
                        innovative digital experiences, leveraging optimized infrastructure and operational efficiency.
                        My dedication to collaboration and continuous learning drives my passion for developing
                        cutting-edge technology solutions.
                    </p>

                    <p className="about-description">
                        Outside of coding, I enjoy working out, playing video games,
                        riding my bicycle along scenic paths, and watching various movies and TV shows.
                    </p>

                    <div className="button-container">
                        <button className="resume-button"><a href={resume} download><p>Resumé</p></a></button>
                    </div>
                </div>
            </Fade>
        </div>
    );
};

export default About;
