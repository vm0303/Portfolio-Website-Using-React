import "./ProjectList.css";
import Project from "../Proj/Project"
import {Fade} from "react-reveal";
import {projects} from "../../data"


const ProjectList = () => {
    return (
        <Fade effect="fade" delay={300}>
            <div className="project-body" id="projects">

                <div className="project-texts">
                    <h1 className="project-title">Projects</h1>
                    <p className="project-description">
                        Take a look at some of the freelance projects I have done!
                    </p>
                </div>
                <div className="project-list">
                    {projects.map((item) =>
                        (
                            <Project key={item.id} img={item.img} link={item.link}/>
                        ))
                    }
                </div>
            </div>
        </Fade>

    )
}
export default ProjectList;
