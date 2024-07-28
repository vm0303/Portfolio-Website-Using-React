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
                        I’ve been passionate about coding from a young age, which has led me to specialize in creating
                        user-friendly solutions for both front-end and back-end development. I work with technologies
                        like HTML5, CSS3, JavaScript, Angular, React, Java, Spring Boot, and Hibernate to build dynamic
                        and effective applications. Additionally, my AWS Cloud Practitioner certification further
                        empowers me to develop innovative, scalable solutions. I’m always eager to learn and
                        collaborate,
                        using tools like Git, Bitbucket, Maven, and Jira to stay connected and streamline my work.
                        My goal is to develop cutting-edge technology that truly makes a difference in the world.
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
