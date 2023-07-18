import { Link } from "react-router-dom";
import { Post, User } from "../types/common.types";
import Tags from "./Tags";

interface Props {
  onDelete: () => void;
}

export default function BtnDelete(props: Props) {
  return (
    <button
      type="button"
      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      onClick={props.onDelete}
    >
      Eliminar
    </button>
  );
}
