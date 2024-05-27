import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";
import Post from "../Post";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  // const { userInfo } = useContext(UserContext);
  let { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/userposts/${id}`).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  // console.log(posts);
  return (
    <>
      <span className="flex justify-center text-2xl font-bold py-5">
        Your posts
      </span>
      <div className="flex flex-col ">
        {posts.length > 0 ? (
          posts.map((post) => <Post {...post} key={post._id} />)
        ) : (
          <div className="text-4xl text-center mt-10 font-bold">
            You have no posts
          </div>
        )}
      </div>
    </>
  );
};

export default UserPosts;
