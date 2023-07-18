import { useEffect, useState } from "react";
import UserPost from "../components/UserPost";

import { useParams, Link, useNavigate } from "react-router-dom";
import NavbarWithDropdown from "../layouts/NavBar";
import { User, Post } from "../types/common.types";
import BtnDelete from "../components/BtnDelete";
import { useForm } from "react-hook-form";

export default function IndexPost() {
  const [posts, setPosts] = useState<Post>({});
  const [user, setUser] = useState<User[]>({});
  const { id, postAuthorId } = useParams();
  const navigate = useNavigate();

  const { setValue } = useForm;
  const tokenUser = localStorage.getItem("token") || "";
  const payloadUser = tokenUser.split(".")[1];

  let userIdToken = "";
  if (payloadUser) {
    userIdToken = JSON.parse(atob(payloadUser)).id; // atob
  }

  function userPost() {
    fetch(`http://localhost:8080/posts/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setPosts(res);
      });
  }

  function dataUser() {
    fetch(`http://localhost:8080/users/${postAuthorId}`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
      });
  }
  useEffect(() => {
    userPost();
    dataUser();
  }, [id, postAuthorId]);

  function onDelete(id: string) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/posts/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => navigate("/"));
  }

  function onEdit(id: string) {
    alert("Holaaaaaa");
  }

  return (
    <>
      <NavbarWithDropdown />
      <main className="grid grid-cols-6 gap-3 justify-b flex flex-wrap ">
        <aside className="col-span-auto flex justify-end">
          <div className=" w-10 text-sm  mt-20">
            <a
              href="#"
              className="block w-full pt-2 pb-3 text-gray-600 cursor-pointer text-base px-0"
            >
              <button
                type="button"
                className="nav-left__drop__button_h1 btn border border-0 dropdown d-flex  align-content-center justify-content-center"
                id="likeButtonAdd"
              >
                <span
                  className="material-symbols-outlined more_horiz m-0"
                  id="heartSymbolLeft"
                >
                  heart_plus
                </span>
                <span id="counterLikeButtonAdd">0</span>
              </button>
            </a>
            <a
              href="#"
              className="block w-full pt-2 pb-3 text-gray-600 cursor-pointer text-base px-0"
            >
              <button
                type="button"
                className="nav-left__drop__button_h2 btn border border-0 dropdown d-flex  align-content-center justify-content-center"
              >
                <span className="material-symbols-outlined more_horiz m-0">
                  mode_comment
                </span>
              </button>
            </a>
            <a
              href="#"
              className="block w-full pt-2 pb-3 text-gray-600 cursor-pointer text-base px-0"
            >
              <button
                type="button"
                className="nav-left__drop__button_h3 btn border border-0 dropdown d-flex  align-content-center justify-content-center"
              >
                <span className="material-symbols-outlined more_horiz m-0">
                  bookmark
                </span>
              </button>
            </a>
            <a
              href="#"
              className="pt-2 pb-3text-gray-600 cursor-pointer text-2xl px-0 "
            >
              ...
            </a>
          </div>
        </aside>
        <div className="w-auto col-span-3">
          <div className=" w-full bg-white border border-gray-200 ">
            <img className="w-full" src={posts?.data?.postImageURL} alt="" />

            <div className="pl-5 pt-4 flex gap-2">
              <img
                className="rounded-full w-8 h-8"
                src={user.data?.userImage}
                alt="image description"
              />

              <div className="mb-8">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm">{posts?.data?.postAuthor}</h3>
                    <p className="text-xs">{`${posts?.data?.postDateDay} ${posts?.data?.postDateMonth}`}</p>
                  </div>
                  <div>
                    {userIdToken === posts?.data?.postAuthorId && (
                      <>
                        <Link to={`/newPost`}>
                          <button
                            type="button"
                            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                            OnClick={onEdit}
                          >
                            Editar
                          </button>
                        </Link>
                        <BtnDelete
                          onDelete={() => onDelete(posts?.data?._id)}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="pt-10 pb-4 flex gap-12">
                  <span>🔥</span>
                  <span>🙌</span>
                  <span>🤯</span>
                  <span>🦄</span>
                  <span>💖</span>
                </div>
                <h3 className="text-5xl">{posts?.data?.postTitle}</h3>
                <div className=" pt-4 flex gap-5 mt-3">
                  {posts.data?.postTags.map((tag) => {
                    return (
                      <span className="px-3  mr-2 text-black text-sm text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200 cursor-pointer">
                        {tag}
                      </span>
                    );
                  })}
                </div>
                <p className="text-xl pt-8">{posts?.data?.postContent}</p>
              </div>
            </div>

            <div className="flex container m-auto px-6">
              <img
                className="rounded-full w-8 h-8"
                src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/00429b6ddafe39aa80e8901a8b3c9c536ff0e522_full.jpg"
                alt="image description"
              />
              <textarea
                rows="4"
                className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <div className="py-4 ml-14">
              <button
                href="#"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Submit
              </button>
              <button
                href="#"
                className="text-white bg-gray-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-500 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Preview
              </button>
            </div>
          </div>
        </div>
        <aside className="col-span-2">
          <div className="max-w-xs text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg  dark:text-white">
            <a
              href="#"
              className="block w-full px-4 py-4 text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer dark:bg-black dark:border-gray-600"
            ></a>
            <div className="flex">
              <img
                src={user.data?.userImage}
                alt=""
                className="rounded-full w-10 h-10 -mt-4 ml-4"
              />
              <p className="text-black">{posts?.data?.postAuthor}</p>
            </div>
            <div className="text-center mt-3">
              <button
                href="#"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-72"
              >
                Follow
              </button>
            </div>
            <div className="text-black pl-5">
              <div className="py-3">
                <h3 className="text-base">Location</h3>
                <p>{user.data?.userLocation}</p>
              </div>
              <div className="py-2">
                <h3 className="text-base">Education</h3>
                <p>{user.data?.userEducation}</p>
              </div>
              <div className="py-3">
                <h3 className="text-base">Joined</h3>
                <p>{user.data?.userJoined}</p>
              </div>
            </div>
          </div>

          <div className="max-w-xs bg-white shadow dark:bg-white dark:border-gray-300 mt-3">
            <p className="block w-full px-4 py-2 text-black border-b border-gray-200 rounded-t-lg text-xl">
              More from{" "}
              <b className="text-blue-500"> {posts.data?.postAuthor}</b>
            </p>
            <a
              href="#"
              className="block w-full px-4 py-2 text-black border-b border-gray-200 rounded-t-lg cursor-pointer"
            >
              bien la inteligencia artificial no tiene como finalidad reemplazar
              a los humanos, sino mejorar significativamente las capacidades de
              estos, a muchos les preocupa cómo esta tecnología
            </a>
            <div className=" pt-4 flex gap-5 pb-4">
              <span className="px-3  mr-2 text-black text-sm text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200 cursor-pointer">
                #tech
              </span>
              <span className="px-3  mr-2 text-black text-sm text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200 cursor-pointer">
                #tec
              </span>
              <span className="px-3  mr-2 text-black text-sm text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200 cursor-pointer">
                #dev
              </span>
            </div>
          </div>

          <div className="max-w-xs bg-white shadow dark:bg-white dark:border-gray-300 mt-3">
            <h2 className="py-1 pl-8">{posts.data?.postAuthor}</h2>
            <div className="flex justify-center">
              <img
                className=" w-72 "
                src="https://img.freepik.com/fotos-premium/hombre-negocios-usando-dispositivos-tecnologia-e-iconos-interfaz-linea-delgada_117023-904.jpg"
              />
            </div>
            <div className="p-5">
              <h4 className="mb-3 font-semibold text-xl">
                ¿Qué quieres saber sobre la inteligencial?
              </h4>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Commodi, cupiditate.
              </p>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
