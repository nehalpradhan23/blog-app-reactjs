import React, { useContext, useEffect, useState } from "react";
import Post from "../Post";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  const { userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  // console.log(posts);
  const username = userInfo?.username;
  return (
    <>
      {username && (
        <div className="flex justify-end mt-4">
          <Link
            to={`/userposts/${userInfo.id}`}
            className="p-3 bg-gray-900 text-white hover:bg-gray-700"
          >
            See your posts
          </Link>
        </div>
      )}
      <div className="flex flex-col ">
        {posts.length > 0 &&
          posts.map((post) => <Post {...post} key={post._id} />)}
      </div>
    </>
  );
};

export default IndexPage;
