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
                        My fascination with development and coding began at a young age, driven by the promise of
                        improving daily life through technology. Over the years, I've honed my skills in both
                        front-end and back-end development, focusing on user-friendly solutions and solving intricate
                        challenges. In addition, I hold the AWS Cloud Practitioner certification, enabling me to
                        design efficient and secure cloud solutions using Amazon Web Services. This certification
                        enhances my ability to deliver innovative digital experiences while optimizing infrastructure
                        and operational efficiency. My commitment to collaboration and continuous learning fuels my
                        passion for creating cutting-edge technology solutions.
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
