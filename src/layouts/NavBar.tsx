"use client";
import { useEffect, useState } from "react";
import { Dropdown, Navbar } from "flowbite-react";

import { useNavigate, Link } from "react-router-dom";
import LinkCreatePost from "../components/LinkCreatePost";
import { Post } from "../types/common.types";

export default function NavbarWithDropdown() {
  // const [postsCards, setPostsCards] = useState<Post[]>([]);

  const navigate = useNavigate();
  const tokenUser = localStorage.getItem("token") || "";
  const payloadUser = tokenUser.split(".")[1];

  let userIdToken = "";
  if (payloadUser) {
    userIdToken = JSON.parse(atob(payloadUser)); // atob
  }
  function onclick() {
    localStorage.removeItem("token");
    navigate("login");
  }

  // function getAllPost() {
  //   fetch("http://localhost:8080/posts/")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setPostsCards(res.data);
  //     });
  // }

  // useEffect(() => {
  //   getAllPost();
  // }, []);
  return (
    <Navbar className="border mb-4">
      <div className="flex flex-wrap items-center justify-between container m-auto">
        <div className="flex items-center">
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
          <span className=" text-2xl font-semibold whitespace-nowrap text-black">
            <div className="">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  className="block w-full p-2 pe-40 text-sm text-gray-900 border border-black-300 rounded-lg bg-gray-100 focus:ring-blue-500 "
                />
              </div>
            </div>
          </span>
        </div>
        <div className="hidden w-full md:block md:w-auto  ">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border-2 border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-blue text-blue-600 flex items-center ">
            <li className="flex items-center">
              <Link
                as={Link}
                to={`/newPost`} //esto esta bien
                type="button"
                className="text-blue-700 hover:text-white border  hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500"
              >
                Create Post
              </Link>
            </li>
            <li>
              <div className="flex md:order-2">
                <Dropdown
                  inline
                  label={
                    <img
                      alt="User settings"
                      src={userIdToken.userImage}
                      className="w-9 rounded-full"
                    />
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm">
                      {userIdToken.userName}
                    </span>
                    <span className="block truncate text-sm font-bold ">
                      {`@${userIdToken.userNickName}`}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item onClick={onclick}>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Navbar>
  );
}

{
  /* <nav className=" border-gray-200 bg-white border mb-4 ">
 
</nav>; */
}
