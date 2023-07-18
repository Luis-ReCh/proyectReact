import { Link } from "react-router-dom";
import { Post } from "../types/common.types";

interface Props {
  post: Post;
}

export default function LinkCreatePost(props: Props) {
  return (
    <Link
      as={Link}
      to={`/newPost/${props.post?.postAuthorId}`}
      type="button"
      className="text-blue-700 hover:text-white border  hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500"
    >
      Create Post
    </Link>
  );
}
