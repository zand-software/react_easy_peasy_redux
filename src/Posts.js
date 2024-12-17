import { React, useEffect } from "react";
import Feed from "./Feed";
import { useStoreState, useStoreActions } from "easy-peasy";

const Posts = ({ fetchErrorPosts, isLoadingPosts }) => {
  const posts = useStoreState((state) => state.posts);
  const search = useStoreState((state) => state.search);
  const setSearch = useStoreActions((actions) => actions.setSearch);
  const setSearchResults = useStoreActions(
    (actions) => actions.setSearchResults
  );

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search, setSearchResults]);

  const searchResults = useStoreState((state) => state.searchResults);

  return (
    <main className="Posts">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search Posts</label>
        <input
          id="search"
          type="text"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {isLoadingPosts && <p className="statusMsg">Loading posts...</p>}
      {!isLoadingPosts && fetchErrorPosts && (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchErrorPosts}
        </p>
      )}
      {!isLoadingPosts &&
        !fetchErrorPosts &&
        (searchResults.length ? (
          <Feed posts={searchResults} />
        ) : (
          <p className="statusMsg">No posts to display.</p>
        ))}
    </main>
  );
};

export default Posts;
