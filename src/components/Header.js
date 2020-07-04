import React, { useContext } from "react";
import Cookies from "js-cookie";
import { Link, useHistory } from "react-router-dom";
import GlobalContext from "../store/global";

export default function Header({ title }) {
  const [{ loggedIn }, dispatch] = useContext(GlobalContext);

  const history = useHistory();
  function handleLogout(e) {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    Cookies.remove("token");
    history.push("/login");
    // window.location.href = "/login";
  }
  return (
    <header className="bg-teal-500 text-white p-4 flex justify-between">
      <div className="flex">
        <p className="mx-2">
          <Link to="/" className="bg-teal-700 p-2 italic mt-4">{title}</Link>
        </p>

        <p className="mx-4 bg-teal-600 p-2">
          <Link to="/users">USERS</Link>
        </p>
        <p className="mx-2 bg-teal-600 p-2">
          <Link to="/about">ABOUT</Link>
        </p>
        <p className="mx-2 bg-teal-600 p-2">
          <Link to="/card-game">CARD GAME</Link>
        </p>
      </div>
      <div className="flex">
        {loggedIn ? (
          <p className="mx-2 cursor-pointer" onClick={handleLogout}>
            LOGOUT
          </p>
        ) : (
          
            <Link to="/login" className="bg-black p-2 hover:bg-gray-700 rounded-lg">LOGIN</Link>
          
        )}
      </div>
    </header>
  );
}
