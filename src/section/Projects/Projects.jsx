import styles from "./ProjectsStyles.module.css";
import weather from "../../assets/weather.jpg";
import ProjectCard from "../../common/ProjectCard";
import marketplace from  "../../assets/marketplace.jpg";
import dental from  "../../assets/dental.jpg";
import college from  "../../assets/college.jpg";

function Projects() {
  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">Projects</h1>
      <div className={styles.projectsContainer}>
        <ProjectCard
          src={weather}
          link="https://github.com/Midhunos/weather1"
          h3="Weather"
          p="Weather Page"
        />
         <ProjectCard
          src={marketplace}
          link="https://github.com/Midhunos/marketplace-django"
          h3="MarketPlace"
          p="Online Shopping Page"
        />
         <ProjectCard
          src={dental}
          link="https://github.com/Midhunos/Dental-Project-HTML-CSS-"
          h3="Dental"
          p="Dental page"
        />
          <ProjectCard
          src={college}
          link="https://github.com/Midhunos/Collegestore"
          h3="College"
          p="College Site"
        />
      </div>
    </section>
  );
}

export default Projects;
