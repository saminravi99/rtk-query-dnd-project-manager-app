import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logoImage from "../assets/images/logo.svg";
import { userLoggedOut } from "../features/auth/authSlice";
import Search from "./Search";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth) || {};
  const { name, img } = user || {};

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };
  const location = useLocation();
  return (
    <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
      <img src={logoImage} className="h-10 w-10" alt="logo" />
      {location.pathname === "/projects" && <Search />}
      <div className="ml-10">
        <Link
          className={`mx-2 text-sm font-semibold ${
            location.pathname === "/projects"
              ? "text-indigo-700"
              : "text-black hover:text-indigo-700"
          }`}
          to="/projects"
        >
          Projects
        </Link>
        <Link
          className={`mx-2 text-sm font-semibold  ${
            location.pathname === "/teams"
              ? "text-indigo-700"
              : "text-black hover:text-indigo-700"
          }`}
          to="/teams"
        >
          Teams
        </Link>
        <span
          className={`mx-2 text-sm font-semibold cursor-pointer  hover:text-indigo-700 `}
          onClick={logout}
        >
          Log Out
        </span>
      </div>

      <button className="flex items-center justify-center ml-auto mx-3 overflow-hidden ">
        <h2 className={`text-md font-bold`}>Hello, Mr. {name}</h2>
      </button>
      <button className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-full cursor-pointer ring-2 ring-indigo-500">
        <img className="" src={img} alt="" />
      </button>
    </div>
  );
};

export default Navbar;
