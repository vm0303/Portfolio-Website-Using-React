import "./about.css";
import $ from 'jquery';
import pic from "../../image/about_me.jpg";
import {Fade} from "react-reveal";
import resume from "../../assets/2022-Vishal-Madhav-Resume.pdf"

export default function About()
{
    $(function() {
        $('.button')
            .on('mouseenter', function(e) {
                let parentOffset = $(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;
                $(this).find('span').css({top:relY, left:relX})
            })
            .on('mouseout', function(e) {
                let parentOffset = $(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;
                $(this).find('span').css({top:relY, left:relX})
            });
    });

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

            <Fade effect="fade" delay={900}>
                <div className="about-right">
                    <h1 className="about-title">About Me</h1>
                    <h3 className="about-sub-title">
                        "Great things come from hard work and perseverance. No excuses." -Kobe Bryant
                    </h3>

                    <p className="about-description">
                        Since high school, I always had a passion to be a programmer, because I would be
                        creating these various applications and services that can benefit people in their
                        day-to-day lives. Whether it's something entertaining like a game, crucial like a
                        full-scale algorithm, or formal like a software service for a company,
                        I feel joyful and satisfied that my work can benefit millions of people around the world.
                    </p>
                    <p className="about-description">
                        Whenever I am not coding, you'll find me working out at the gym, playing tons of
                        video games, or watching a movie or TV show that I like.
                    </p>

                    <div id="container">
                        <div id="button-translate">
                            <div id="translate"></div>
                            <a href={resume} download className="button"><p>Resumé</p><span></span></a>

                        </div>
                    </div>

                </div>
            </Fade>
        </div>


    )
}









