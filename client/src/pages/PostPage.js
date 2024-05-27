import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./PostPage.css";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  let { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  const handleDeletePost = (id) => {
    fetch(`http://localhost:4000/deletepost/${id}`, {
      method: "POST",
    })
      .then((res) => console.log(res))
      .catch((err) => new Error(err));

    navigate(`/userspost/${id}`);
  };
  // ======================================================================================
  if (!postInfo) {
    return "";
  }
  return (
    <div className="my-[20px]">
      <h1 className="text-4xl font-bold text-center pt-3">{postInfo.title}</h1>
      <time className="text-center text-sm block text-gray-500">
        {formatISO9075(new Date(postInfo.createdAt))}
      </time>
      <div className="text-center mb-4">by @{postInfo?.author?.username}</div>
      {userInfo?.id === postInfo.author._id && (
        // edit and delete post
        <div className="flex justify-center gap-3 mb-5">
          <div className="">
            <Link
              to={`/edit/${postInfo._id}`}
              className="bg-gray-800 text-white p-4 inline-flex items-center gap-2 rounded-md hover:bg-gray-600"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="20px"
                width="20px"
              >
                <path d="M7 17.013l4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z" />
                <path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z" />
              </svg>
              Edit this post
            </Link>
          </div>
          <div
            onClick={() => handleDeletePost(id)}
            className="bg-red-500 text-white p-4 rounded-md hover:bg-red-600"
          >
            Delete this post
          </div>
        </div>
      )}
      <div className="max-h-[400px] overflow-hidden">
        <img
          src={`http://localhost:4000/${postInfo.cover}`}
          alt=""
          className="block m-auto object-cover"
        />
      </div>
      <div className="text-xl overflow-hidden max-h-[350px] block my-[10px]">
        {postInfo.summary}
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
        className="content"
      ></div>
    </div>
  );
}
