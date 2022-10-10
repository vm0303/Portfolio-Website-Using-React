import "./projectList.css";
import Project from "../Proj/Project"


const ProjectList = () =>
{
    return (
        <div className="project-body">
        <div className="project-texts" id="projects">
            <h1 className="project-title">Projects</h1>
            <p className="project-description">
                Take a look at some of the projects I have done!
            </p>
        </div>
            <div className="project-list">
                <Project/>
                <Project/>
                <Project/>
                <Project/>
                <Project/>
            </div>
        </div>

    )
}
export default ProjectList;
