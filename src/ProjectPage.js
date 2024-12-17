import React from "react";
import { useParams, Link } from "react-router-dom"; // useParams is a custom hook that comes with react router dom - we use the useParams to get the parameter
import { useStoreState } from "easy-peasy";

const ProjectPage = () => {
  const { id } = useParams();
  const getProjectById = useStoreState((state) => state.getProjectById);
  const project = getProjectById(id);

  return (
    <main className="ProjectPage">
      {project && ( //&& means ok (two ampersands) - we have a project (project is true - if it exists) then we're going to display this
        <>
          <h2>{project.item}</h2>
          <p className="projectBody">{project.description}</p>
        </>
      )}
      {!project && ( // if project is not true essentially with the exclamation mark here it does not exist but we've somehow got to this page;
        // we're using Link to provide a link back to the homepage if it doesn't exist
        <>
          <h2>Project Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default ProjectPage;
