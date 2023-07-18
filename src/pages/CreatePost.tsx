import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Post, User } from "../types/common.types";

import { Link, useParams, useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [user, setUser] = useState<User[]>({});
  const [editUserNew, setEditUserNew] = useState<User[]>({});
  const navigate = useNavigate();

  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Post>();

  const tokenUser = localStorage.getItem("token") || "";
  const payloadUser = tokenUser.split(".")[1];

  let userIdToken = "";
  if (payloadUser) {
    userIdToken = JSON.parse(atob(payloadUser)).id; // atob
  }

  console.log("token ", userIdToken);

  function dataUser() {
    fetch(`http://localhost:8080/users/${userIdToken}`)
      .then((res) => res.json())
      .then((res) => {
        //console.log("esta es la res FULLLLL", res.data);
        setUser(res.data);
      });
  }

  function editUser() {
    fetch(`http://localhost:8080/posts/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("esta es la resPOST FULLLLL", res);
        setEditUserNew(res.data);
      });
  }
  useEffect(() => {
    dataUser();
    editUser();
  }, []);

  function onSubmit(data) {
    const token = localStorage.getItem("token");
    const date = new Date();
    console.log(token);
    fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postAuthor: `${user.userName} ${user.userLastname}`,
        postAuthorId: userIdToken,
        postDateDay: date.toDateString().split(" ").slice(2, 3)[0],
        postDateMonth: date.toDateString().split(" ").slice(1, 2)[0],
        postImageURL: data.postImageURL,
        postReadTime: parseInt(data.postReadTime),
        postRelevance: Math.ceil(Math.random() * 10),
        postTitle: data.postTitle,
        postTags: data.postTags.split(" ").slice(0, 4),
        postContent: data.postContent,
      }),
    }).then((res) => {
      if (res) {
        navigate("/");
      } else {
        alert("error");
      }
    });
  }
  return (
    <aside>
      <nav className="flex justify-around  items-center mt-2">
        <div className="flex items-center gap-4">
          <Link
            as={Link}
            to="/"
            className="block py-2 pl-3 pr-4  md:bg-transparent md:p-0 "
          >
            <img
              src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
              alt=""
              className="w-12 h-10 mr-2"
            />
          </Link>
          <p>Create Post</p>
        </div>
        <div className="flex gap-4">
          <p>Edit</p>
          <p>Preview</p>
        </div>
        <Link
          as={Link}
          to="/"
          className="block py-2 pl-3 pr-4  md:bg-transparent md:p-0 "
        >
          <div>X</div>
        </Link>
      </nav>
      <aside className="grid grid-cols-3 container m-auto w-4/6 mt-4 ">
        <div className=" bg-white col-span-2">
          <button className="py-3 px-2 border rounded mt-5 ml-5">
            Add a cover image
          </button>
          <div className="pt-10 px-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative z-0 w-full mb-6 group ">
                <input
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-gray-300  focus:outline-none focus:ring-0 peer"
                  {...register("postImageURL", {
                    required: { value: true, message: "La URL es requerida" },
                  })}
                />
                <label className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  URL..
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-gray-300  focus:outline-none focus:ring-0 peer"
                  {...register("postReadTime", {
                    required: { value: true, message: "El time es requerido" },
                  })}
                />
                <label className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Read time on minutes...
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  className="block py-4 px-0 w-full text-4xl font-bold text-gray-900 bg-transparent border-0  appearance-none text-black dark:border-gray-300  focus:outline-none focus:ring-0 peer"
                  placeholder="New post title here.."
                  {...register("postTitle", {
                    required: { value: true, message: "El time es requerido" },
                  })}
                />
              </div>
              <div className="relative z-0 w-full mb-6 group ml-5">
                <input
                  type="text"
                  className="block py-0 px-0 w-full text-sm text-gray-900 bg-transparent border-0  text-black dark:border-gray-300  focus:outline-none focus:ring-0 peer"
                  placeholder=" Add up to 4 tags.."
                  {...register("postTags")}
                />
              </div>
              <div className="flex bg-gray-100 py-2 justify-center">
                <div>
                  <button
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="BOLD. CMD + B"
                    className="editor-button"
                  >
                    <svg
                      className="crayons-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 11h4.5a2.5 2.5 0 0 0 0-5H8v5Zm10 4.5a4.501 4.501 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.5 4.5 0 0 1 18 15.5ZM8 13v5h5.5a2.5 2.5 0 0 0 0-5H8Z"></path>
                    </svg>
                  </button>
                  <button
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="ITALIC. CMD + I"
                    className="editor-button"
                  >
                    <svg
                      className="crayons-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15v2Z"></path>
                    </svg>
                  </button>
                  <button
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="LINK. CMD + K"
                    className="editor-button"
                  >
                    <svg
                      className="crayons-icon"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18.364 15.536 16.95 14.12l1.414-1.414a5.001 5.001 0 0 0-3.531-8.551 5 5 0 0 0-3.54 1.48L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 1 1 9.9 9.9l-1.415 1.414zm-2.828 2.828-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607 1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"></path>
                    </svg>
                  </button>
                  <button
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Ordered List"
                    className="editor-button"
                  >
                    <svg
                      className="crayons-icon"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 4h13v2H8zM5 3v3h1v1H3V6h1V4H3V3zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2zM8 11h13v2H8zm0 7h13v2H8z"></path>
                    </svg>
                  </button>
                  <button
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Unordered List"
                    className="d-none d-md-inline editor-button"
                  >
                    <svg
                      className="crayons-icon"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 4h13v2H8zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8zm0 7h13v2H8z"></path>
                    </svg>
                  </button>
                  <button
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Heading"
                    className="d-none d-md-inline editor-button"
                  >
                    <svg
                      className="crayons-icon"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17 11V4h2v17h-2v-8H7v8H5V4h2v7z"></path>
                    </svg>
                  </button>
                  <button
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Quote"
                    className="d-none d-md-inline editor-button"
                  >
                    <svg
                      className="crayons-icon"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5 3.871 3.871 0 0 1-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5 3.871 3.871 0 0 1-2.748-1.179z"></path>
                    </svg>
                  </button>
                  <button
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Code"
                    className="d-none d-xl-inline editor-button"
                  >
                    <svg
                      className="crayons-icon"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m23 12-7.071 7.071-1.414-1.414L20.172 12l-5.657-5.657 1.414-1.414zM3.828 12l5.657 5.657-1.414 1.414L1 12l7.071-7.071 1.414 1.414z"></path>
                    </svg>
                  </button>
                  <button
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Code Block"
                    className="d-none d-xl-inline editor-button"
                  >
                    <svg
                      className="crayons-icon"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5zm15 7-3.536 3.536-1.414-1.415L16.172 12 14.05 9.879l1.414-1.415zM7.828 12l2.122 2.121-1.414 1.415L5 12l3.536-3.536L9.95 9.88z"></path>
                    </svg>
                  </button>
                  <button
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="EMBED. CMD + Shift + K"
                    className="d-none d-xxl-inline editor-button"
                  >
                    <svg
                      className="crayons-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 9h8L11 24v-9H4l9-15v9Zm-2 2V7.22L7.532 13H13v4.394L17.263 11H11Z"></path>
                    </svg>
                  </button>
                  <button
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Upload Image"
                    className="editor-button"
                  >
                    <svg
                      className="crayons-icon c-btn__icon"
                      aria-hidden="true"
                      focusable="false"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20 5H4v14l9.292-9.294a1 1 0 0 1 1.414 0L20 15.01V5zM2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path>
                    </svg>
                  </button>
                </div>
                <button className="editor-button">
                  <svg
                    className="crayons-icon c-btn__icon"
                    aria-hidden="true"
                    focusable="false"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 17a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0-7a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm2-5a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"></path>
                  </svg>
                </button>
              </div>
              <div>
                <textarea
                  cols="30"
                  rows="10"
                  className="relative w-full outline-none py-5 pxb-5 text-xl border-0"
                  placeholder="Write your post here..."
                  {...register("postContent", {
                    required: {
                      value: true,
                      message: "El Contenido es requerido",
                    },
                  })}
                ></textarea>
              </div>

              <div>
                <div className="bg-gray-100 py-4">
                  <button
                    href="#"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Publish
                  </button>
                  <button
                    type="button"
                    className="text-black focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full text-sm px-5 py-2 mr-2 mb-2 dark:hover:bg-gray-300 hover:text-blue-500"
                  >
                    Save Draft
                  </button>
                  <button
                    type="button"
                    className="text-black focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full text-sm px-5 py-2 mr-2 mb-2 dark:hover:bg-gray-300 hover:text-blue-500"
                  >
                    Revert new changes
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* editor-bar border-start border-end border-secondary border-1 border-opacity-25 d-flex justify-content-between align-items-center px-5 */}
        </div>
        <div>
          <h4 className="font-semibold pb-5">Tagging Guidelines</h4>
          <p>
            ags help people find your post. Think of tags as the topics or
            categories that best describe your post. Add up to four
            comma-separated tags per post. Combine tags to reach the appropriate
            subcommunities. Use existing tags whenever possible. Some tags, such
            as “help” or “healthydebate”, have special posting guidelines
          </p>
        </div>
      </aside>
    </aside>
  );
}
