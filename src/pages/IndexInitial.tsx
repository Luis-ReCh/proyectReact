import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post, User } from "../types/common.types";
import PostCard from "../components/PostCard";
import NavbarWithDropdown from "../layouts/NavBar";

import { Link } from "react-router-dom";

export default function IndexInitial() {
  const [postsCards, setPostsCards] = useState<Post[]>([]);
  const { postAuthorId } = useParams();

  // const tokenUser = localStorage.getItem("token") || "";
  // const payloadUser = tokenUser.split(".")[1];

  // let userIdToken = "";
  // if (payloadUser) {
  //   userIdToken = JSON.parse(atob(payloadUser)).id; // atob
  // }

  // // console.log("token ", userIdToken);
  function getAllPost() {
    fetch("http://localhost:8080/posts/")
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);

        setPostsCards(res.data);
      });
  }

  useEffect(() => {
    getAllPost();
  }, [postAuthorId]);

  return (
    <>
      <NavbarWithDropdown post={PostCard} />
      <main className="grid grid-cols-5 sm:grid-cols-6 gap-0 sm:gap-3 justify-b ">
        <aside className=" hidden sm:block col-span-1 flex justify-end">
          <div className="w-48 text-sm">
            <a
              href="#"
              className="block w-full px-4 pt-2 pb-3 text-black cursor-pointer flex items-center gap-3 text-base "
            >
              <img src="../public/imgNav/home.svg" className="w-5" />
              Home
            </a>
            <a
              href="#"
              className="block w-full px-4 pt-2 pb-3 text-black cursor-pointer flex items-center gap-3 text-base"
            >
              <img src="../public/imgNav/Readinglist.svg" className="w-5" />
              Reading List
            </a>
            <a
              href="#"
              className="block w-full px-4 pt-2 pb-3 text-black cursor-pointer flex items-center gap-3 text-base"
            >
              <img src="../public/imgNav/listings.svg" className="w-5" />
              Listings
            </a>
            <a
              href="#"
              className="block w-full px-4 pt-2 pb-3 text-black cursor-pointer flex items-center gap-3 text-base "
            >
              <img src="../public/imgNav/podcasts.svg" className="w-5" />
              Podcasts
            </a>
            <a
              href="#"
              className="block w-full px-4 pt-2 pb-3 text-black cursor-pointer flex items-center gap-3 text-base "
            >
              <img src="../public/imgNav/video.svg" className="w-5" />
              Videos
            </a>
            <a
              href="#"
              className="block w-full px-4 pt-2 pb-3 text-black cursor-pointer flex items-center gap-3 text-base "
            >
              <img src="../public/imgNav/tags.svg" className="w-5" />
              Tags
            </a>
            <a
              href="#"
              className="block w-full px-4 pt-2 pb-3 text-black cursor-pointer flex items-center gap-3 text-base "
            >
              <img src="../public/imgNav/faq.svg" className="w-5" />
              FAQ
            </a>
            <a
              href="#"
              className="block w-full px-4 pt-2 pb-3 text-black cursor-pointer flex items-center gap-3 text-base "
            >
              <img src="../public/imgNav/forem_shop.svg" className="w-5" />
              Forem Shop
            </a>
            <a
              href="#"
              className="block w-full px-4 pt-2 pb-3 text-black cursor-pointer flex items-center gap-3 text-base "
            >
              <img src="../public/imgNav/sponsors.svg" className="w-5" />
              Sponsors
            </a>
            <a
              href="#"
              className="block w-full px-4 pt-2 pb-3 text-black cursor-pointer flex items-center gap-3 text-base "
            >
              <img src="../public/imgNav/dev.svg" className="w-5" />
              About
            </a>
            <a
              href="#"
              className="block w-full px-4 pt-2 pb-3 text-black cursor-pointer flex items-center gap-3 text-base "
            >
              <img src="../public/imgNav/contact.svg" className="w-5" />
              Contact
            </a>
            <a
              href="#"
              className="block w-full px-4 pt-2 pb-3 text-black cursor-pointer flex items-center gap-3 text-base "
            >
              <img src="../public/imgNav/guides.svg" className="w-5" />
              Guides
            </a>
            <a
              href="#"
              className="block w-full px-4 pt-2 pb-3 text-black cursor-pointer flex items-center gap-3 text-base "
            >
              <img src="../public/imgNav/comparisons.svg" className="w-5" />
              Software comparisons
            </a>
          </div>
        </aside>
        <div className="w-auto col-span-5 md:col-span-3  col-span-5">
          <div className="flex gap-3 text-lg py-2 font-medium pl-2 bg-white">
            <p>Relevant</p>

            <button>Latest</button>

            <p>Top</p>
          </div>
          <div class=" w-full border border-gray-200 ">
            {postsCards?.map((postsCard, index) => {
              return (
                <PostCard
                  key={`post-${index}`}
                  post={postsCard}
                  // user={userPost}
                />
              );
            })}
          </div>
        </div>
        <aside className="hidden md:block hidden md:col-span-2">
          <div class="max-w-xs bg-white shadow dark:bg-white dark:border-gray-300">
            <h2 className="py-1 pl-8"></h2>
            <div className="flex justify-center">
              <img
                class=" w-72 "
                src="https://img.freepik.com/fotos-premium/hombre-negocios-usando-dispositivos-tecnologia-e-iconos-interfaz-linea-delgada_117023-904.jpg"
                alt=""
              />
            </div>
            <div class="p-5">
              <h4 class="mb-3 font-normal text-xl">
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4  md:bg-transparent md:p-0 "
                >
                  fcxvx
                </Link>
              </h4>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Commodi, cupiditate.
              </p>
            </div>
          </div>

          <div class="max-w-xs bg-white shadow dark:bg-white dark:border-gray-300 mt-3">
            <a
              href="#"
              class="block w-full px-4 py-2 text-black border-b border-gray-200 rounded-t-lg cursor-pointer"
            >
              Profile
            </a>
            <a
              href="#"
              class="block w-full px-4 py-2 text-black border-b border-gray-200 rounded-t-lg cursor-pointer"
            >
              EMPLUG STUDENT AMBASSADORS (ESA)
            </a>
            <a
              href="#"
              class="block w-full px-4 py-2 text-black border-b border-gray-200 rounded-t-lg cursor-pointer"
            >
              Four ways GPT can enhance the travel industry
            </a>
            <a
              href="#"
              class="block w-full px-4 py-2 text-black border-b border-gray-200 rounded-t-lg cursor-pointer"
            >
              The JavaScript Interview Bible - A Comprehensive Guide with 1000+
              Essential Questions and Answers!
            </a>
            <a
              href="#"
              class="block w-full px-4 py-2 text-black border-b border-gray-200 rounded-t-lg cursor-pointer"
            >
              App Development Hackathon: Win More Than US$9,000 in Prizes
            </a>
            <a
              href="#"
              class="block w-full px-4 py-2 text-black border-b border-gray-200 rounded-t-lg cursor-pointer"
            >
              SalesforceToNotion
            </a>
            <a
              href="#"
              class="block w-full px-4 py-2 text-black border-b border-gray-200 rounded-t-lg cursor-pointer"
            >
              Create a Listing
            </a>
          </div>
          <div class="max-w-xs bg-white shadow dark:bg-white dark:border-gray-300 mt-3">
            <a
              href="#"
              class="block w-full px-4 py-2 text-black border-b border-gray-200 rounded-t-lg cursor-pointer"
            >
              #Code
            </a>
            <a
              href="#"
              class="block w-full px-4 py-2 text-black border-b border-gray-200 rounded-t-lg cursor-pointer"
            >
              Qué es el Metaverso, qué posibilidades ofrece y cuándo será real
            </a>
            <a
              href="#"
              class="block w-full px-4 py-2 text-black border-b border-gray-200 rounded-t-lg cursor-pointer"
            >
              Python vs Java ?
            </a>
          </div>
          <div class="max-w-xs bg-white shadow dark:bg-white dark:border-gray-300 mt-3 mb-10">
            <a
              href="#"
              class="block w-full px-4 py-2 text-black border-b border-gray-200 rounded-t-lg cursor-pointer"
            >
              #development
            </a>

            <a
              href="#"
              class="block w-full px-4 py-2 text-black border-b border-gray-200 rounded-t-lg cursor-pointer"
            >
              Qué es el Metaverso, qué posibilidades ofrece y cuándo será real
            </a>
            <a
              href="#"
              class="block w-full px-4 py-2 text-black border-b border-gray-200 rounded-t-lg cursor-pointer"
            >
              Python vs Java ?
            </a>
          </div>
        </aside>
      </main>
    </>
  );
}
