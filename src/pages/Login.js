import React, { useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import Guest from "../middleware/Guest";
import GlobalContext from "../store/global";

function Login() {
  const [, dispatch] = useContext(GlobalContext);
  const history = useHistory();
  const [form, setform] = React.useState({ email: "", password: "" });
  const [error, seterror] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  function handleChange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  function handleForm(e) {
    e.preventDefault();
    seterror("");
    setIsLoading(true);
    axios
      .post("/api/login?delay=1", form)
      .then((res) => {
        Cookies.set("token", res.data.token);
        dispatch({ type: "SET_LOGIN", payload: res.data.token });
        history.push("/");
        // window.location.href = "/";
        // setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        seterror(err.response.data.error);
      });
  }

  return (
    <div className="flex justify-center">
      <form class="w-full p-8 lg:w-1/2 bg-white shadow-lg" onSubmit={handleForm}>
                    <div class="flex justify-center shadow-lg">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/768px-Circle-icons-profile.svg.png"
                            class="w-40 h-36" />
                    </div>

                    <div class="px-16">
                        <div class="mt-4 flex items-center justify-between">
                            <span class="border-b w-1/5 lg:w-1/4"></span>
                            <a href="#" class="text-xl text-center text-gray-500 uppercase">USER LOGIN</a>
                            <span class="border-b w-1/5 lg:w-1/4"></span>
                        </div>
                        <div class="mt-16">
                            <label class="block text-gray-700 text-sm font-bold mb-2"></label>
                            <input
                                class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="email" name="email" placeholder="EMAIL" value={form.email}
                                onChange={handleChange}/>
                        </div>
                        <div class="mt-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2"></label>
                            <input
                                class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="password" name="password" placeholder="PASSWORD" onChange={handleChange}
                                value={form.password} />
                        </div>
                        <div class="mt-4">
                            <button
                                className={`w-full text-white p-2 my-2 ${
                                  isLoading ? "bg-blue-500" : "bg-blue-700"
                                }`}
                                disabled={isLoading}
                              >
                                {isLoading ? (
                                  <i className="fas fa-circle-notch fa-spin"></i>
                                ) : (
                                  "LOGIN"
                                )}</button>
                        </div>

                    </div>
                </form>
      {/* <form
        className="w-1/2 bg-gray-100 rounded shadow-lg py-10 text-center"
        onSubmit={handleForm}
      >
        <h1 className="text-3xl">Login Here</h1>
        <p className="my-5 text-red-700 text-xs">{error}</p>
        <div className="flex justify-center">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="p-2 border border-gray-800 w-64 rounded-lg"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="my-2 flex justify-center">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="p-2 border border-gray-800 my-4 w-64 rounded-lg"
            onChange={handleChange}
            value={form.password}
          />
        </div>
        <button
          className={`w-64 text-white p-2 my-2 ${
            isLoading ? "bg-blue-500" : "bg-blue-700"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <i className="fas fa-circle-notch fa-spin"></i>
          ) : (
            "Login"
          )}
        </button>
      </form> */}
    </div>
  );
}

export default Guest(Login);
