import { Link } from "react-router-dom";
import { Post, User } from "../types/common.types";
import Tags from "./Tags";
import { useEffect, useState } from "react";

interface Props {
  post: Post;
  user: User;
}

export default function PostCard(props: Props) {
  const [userPost, setuserPost] = useState<User[]>([]);
  useEffect(() => {
    fetch(`http://localhost:8080/users/${props.post?.postAuthorId}`)
      .then((res) => res.json())
      .then((res) => {
        setuserPost(res.data);
      });
  }, []);
  return (
    <div className="bg-white mb-3 cardList">
      <img
        className="h-auto max-w-full md:max-w-full lg:w-full imgList"
        src={props.post?.postImageURL}
        alt=""
      />

      <div className="pl-5 pt-4 flex gap-2">
        <img
          className="rounded-full w-8 h-8"
          src={userPost?.userImage}
          alt="image description"
        />
        <div>
          <h3 className="text-sm">{props.post.postAuthor}</h3>
          <p className="text-xs">{`${props.post.postDateDay} ${props.post.postDateMonth}`}</p>
          <Link
            to={`/post/${props.post?._id}/${props.post?.postAuthorId}`}
            className="text-2xl font-medium "
          >
            <div>{props.post.postTitle}</div>
          </Link>
        </div>
      </div>
      <div className="ml-14 pt-3">
        {props.post.postTags.map((tag) => {
          return (
            <span className="px-3  mr-2 text-black text-sm text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200 cursor-pointer">
              {tag}
            </span>
          );
        })}
      </div>
      <div className="flex items-center justify-around">
        <div className="flex gap-2 py-5 items-center">
          <div>
            <span>🔥</span>
            <span>🙌</span>
            <span>🤯</span>
            <span>🦄</span>
            <span>💖</span>
          </div>
          <div className="text-sm">
            <span>2</span>
            <span>reactions</span>
          </div>
          <div className="text-sm">
            <span>2</span>
            <span>comments</span>
          </div>
        </div>
        <div className="flex text-sm">
          <p>{`${props.post.postReadTime} Min`}</p>
          <span className="material-symbols-outlined">bookmark</span>
        </div>
      </div>
    </div>
  );
}
