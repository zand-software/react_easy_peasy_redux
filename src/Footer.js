import React from "react";
import { useStoreState } from "easy-peasy";

const Footer = ({ companyName }) => {
  const today = new Date();
  const postCount = useStoreState((state) => state.postCount);

  return (
    <footer className="Footer">
      <p>
        {" "}
        Copyright &copy; {today.getFullYear()}&nbsp;&nbsp;
        <a
          className="App-link"
          href="https://zand-software.weebly.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {companyName}
        </a>{" "}
        {postCount} Blog Posts
      </p>
      {/* <p>{postCount} Blog Posts</p> */}
    </footer>
  );
};

export default Footer;
