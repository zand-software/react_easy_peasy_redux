import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useStoreState, useStoreActions } from "easy-peasy";

const NewPost = () => {
  const navigate = useNavigate();

  const posts = useStoreState((state) => state.posts);
  const postTitle = useStoreState((state) => state.postTitle);
  const postBody = useStoreState((state) => state.postBody);

  const savePost = useStoreActions((actions) => actions.savePost);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const postId = posts[posts.length - 1].id;
    // const id = posts.length ? String(Number(postId) + 1) : "1";
    const id = posts.length
      ? String(Number(posts[posts.length - 1].id) + 1)
      : "1";
    const datetime = format(new Date(), "MMMM, dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody }; // a new post object - we are in the mode of creating objects and our posts need to be inside of an array
    savePost(newPost);
    navigate("/posts");
  };

  return (
    <main className="NewPost">
      <>
        <h3>New Post</h3>
        <form className="newPostForm" onSubmit={handleSubmit}>
          <lable htmlFor="postTitle">Title:</lable>
          <input
            id="postTitle"
            type="text"
            required
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <lable htmlFor="postBody">Post:</lable>
          <textarea
            id="postBody"
            required
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
            style={{ height: "180px", width: "100%" }}
          />
          <button type="submit">Submit</button>
        </form>
      </>
    </main>
  );
};

export default NewPost;
