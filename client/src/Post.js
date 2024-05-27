import React from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
  return (
    <div className="flex max-md:flex-col m-5 border border-black h-[400px] md:h-[200px] bg-gray-200 rounded-md overflow-hidden shadow-md">
      <div className="overflow-hidden object-cover w-fit md:w-[350px]">
        <Link to={`/post/${_id}`}>
          <img
            src={"http://localhost:4000/" + cover}
            className="overflow-hidden object-cover h-max hover:scale-110 transition-all"
          />
        </Link>
      </div>
      <div className="max-md:h-[200px] md:w-[75%] m-3 overflow-hidden flex flex-col gap-2 ">
        <Link to={`/post/${_id}`}>
          <h2 className="text-2xl font-bold hover:text-blue-700 hover:underline">
            {title}
          </h2>
        </Link>
        <p className="text-sm text-gray-700">
          <a className="">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        {/* https://dev.to/codewithshan/truncate-text-with-css-the-possible-ways-1p4o */}
        <p className="summary">{summary}</p>
      </div>
      {/* <div className="post-separator"></div> */}
    </div>
  );
};

export default Post;

// 2:29:10
