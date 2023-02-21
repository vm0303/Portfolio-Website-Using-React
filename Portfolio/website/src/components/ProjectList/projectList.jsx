import "./projectList.css";
import Project from "../Proj/Project"
import {Fade} from "react-reveal";


const ProjectList = () =>
{
    return (
        <div className="project-body">
            <Fade effect="fade" delay={600}>
        <div className="project-texts" id="projects">
            <h1 className="project-title">Projects</h1>
            <p className="project-description">
                Take a look at some of the projects I have done!
            </p>
        </div>
            </Fade>
            <Fade effect="fade" delay={500}>
            <div className="project-list">
                <Project/>
                <Project/>
                <Project/>
                <Project/>
                <Project/>
            </div>
            </Fade>
        </div>


    )
}
export default ProjectList;
