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
                        My passion for coding started early, driving me to specialize in user-friendly solutions for
                        both front-end and back-end development. Through academic projects and diverse professional
                        roles, I've honed my skills, delivering robust solutions and staying updated with industry
                        trends. In addition, learning and acquiring the AWS Cloud Practitioner certification
                        enhanced my ability to deliver innovative digital experiences while use optimized
                        infrastructure and operational efficiency. My commitment to collaboration
                        and continuous learning fuels my passion for creating cutting-edge technology solutions.
                    </p>

                    <p className="about-description">
                        When I'm not immersed in coding, you'll find me working out at the gym, playing video games,
                        riding my bicycle through scenic paths, or enjoying various movies and TV shows.
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
