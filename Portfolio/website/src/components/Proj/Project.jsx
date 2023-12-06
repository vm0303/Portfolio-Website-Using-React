import "./Project.css";


const Project = ({img, link}) => {
    return (
        <div className="proj">

            <div className="proj-browser">
                <div className="proj-web-header-circle"></div>
                <div className="proj-web-header-circle"></div>
                <div className="proj-web-header-circle"></div>
            </div>
            <a href={link} target="blank" rel="noreferrer">
                <img src={img} alt="" className="proj-img"/>
            </a>
        </div>

    )
}
export default Project;