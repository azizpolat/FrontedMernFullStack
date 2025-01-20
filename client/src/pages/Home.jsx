import React from "react";
import { useSelector } from "react-redux";
import HomeCart from "../components/HomeCart";

const Home = () => {
  const { posts } = useSelector((state) => state.posts);

  return (
    <div className="flex items-center m-5 flex-wrap gap-5">
      {posts.length > 0 && posts?.map((post, i) => <HomeCart key={i} post={post} />)}
    </div>
  );
};

export default Home;
