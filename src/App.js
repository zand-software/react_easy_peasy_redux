import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewProject from "./NewProject";
import Posts from "./Posts";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import Projects from "./Projects";
import ProjectPage from "./ProjectPage";
import PostPage from "./PostPage";
import Footer from "./Footer";
import Download from "./Download";
import About from "./About";
import Missing from "./Missing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useStoreActions } from "easy-peasy";

function App() {
  const companyName = "Zand-Software";
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const setProjects = useStoreActions((actions) => actions.setProjects);

  const { postsData, fetchErrorPosts, isLoadingPosts } = useAxiosFetch(
    "http://localhost:3500/",
    "posts"
  );

  const { projectsData, fetchErrorProjects, isLoadingProjects } = useAxiosFetch(
    "http://localhost:3500/",
    "projects"
  );

  useEffect(() => {
    setPosts(postsData);
  }, [postsData]);

  useEffect(() => {
    setProjects(projectsData);
  }, [projectsData]);

  return (
    <div className="App">
      <Header companyName={companyName} />
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/projects"
            element={
              <Projects
                fetchErrorProjects={fetchErrorProjects}
                isLoadingProjects={isLoadingProjects}
              />
            }
          />
          <Route exact path="/project" element={<NewProject />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route
            exact
            path="/posts"
            element={
              <Posts isLoading={isLoadingPosts} fetchError={fetchErrorPosts} />
            }
          />
          <Route exact path="/newpost" element={<NewPost />} />
          <Route exact path="/editpost/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/download" element={<Download />} />
          <Route path="/about" element={<About companyName={companyName} />} />
          <Route path="/*" element={<Missing />} />
        </Routes>
      </Router>
      <Footer companyName={companyName} />
    </div>
  );
}

export default App;
