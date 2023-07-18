import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast, Zoom } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface LoginData {
  email: string;
  password: string;
}
export default function Login() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>();

  const closeAfter = (message) => {
    toast.error(message, {
      autoClose: 2000,
      position: toast.POSITION.TOP_CENTER,
      transition: Zoom,
    });
  };

  function onSubmit(data: LoginData) {
    fetch("http://localhost:8080/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("response: ", res);
        if (res?.token) {
          localStorage.setItem("token", res?.token);

          const token = localStorage.getItem("token");
          navigate("/");
        } else {
          closeAfter("Datos incorrectos");
        }
      })
      .catch(() => {
        closeAfter("Fallo la ejecución");
      });
  }

  return (
    <>
      <nav className="bg-white border-gray-200 bg-white border mb-4">
        <div className="flex flex-wrap items-center justify-around pt-2">
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
              <li>
                <Link
                  as={Link}
                  to="/login"
                  className="block py-2 pl-3 pr-4  md:bg-transparent md:p-0 "
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  as={Link}
                  to="#"
                  type="button"
                  className="text-blue-700 hover:text-white border  hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500"
                >
                  Create account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="container m-auto w-5/12 bg-white ">
        <ToastContainer theme="dark" />
        <aside className="py-6 mt-2 bg-white px-10 ">
          <h2 className="text-3xl font-semibold text-center pt-2">
            Welcome to DEV Community
          </h2>
          <p className="text-center pb-4">
            DEV Community is a community of 1,067,281 amazing developers
          </p>
          <button className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-4 mr-2 mb-2 w-full ">
            Continue with Apple
          </button>
          {/* text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2 */}
          <button className="hadow-sm text-white font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-4 bg-cyan-950 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light mb-2">
            Continue with Forem
          </button>
          <button className="text-white bg-[#24292F] hover:bg-[#24292F]/90  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-gray-500 py-4 mr-2 mb-2 w-full">
            Continue with GitHub
          </button>
          <button className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 text-center py-4 mr-2 mb-2 w-full">
            Continue with Twitter
          </button>
        </aside>
        <div className="text-center">
          Have a password? Continue with your email address
        </div>
        <form
          className="py-6 mt-2 bg-white px-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-2">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              className="hadow-sm bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:shadow-sm-light"
              {...register("email", {
                required: {
                  value: true,
                  message: "El usuario es requerido",
                },
              })}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2">password</label>
            <input
              type="password"
              className="hadow-sm bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:shadow-sm-light"
              {...register("password", {
                required: {
                  value: true,
                  message: "La contraseña es requerido",
                },
              })}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 my-4"
            />
            <label className="ml-2 text-sm text-black">Remember me</label>
          </div>
          <button className="text-white bg-[#0461d3] hover:bg-[#24292F]/90 rounded-lg px-5 py-2.5 text-center dark:focus:ring-gray-500 py-4 mr-2 mb-2 w-full">
            Continue
          </button>
        </form>
      </main>
    </>
  );
}
