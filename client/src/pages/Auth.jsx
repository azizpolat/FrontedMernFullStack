import React, { useState } from "react";
import { loginAction, registerAction } from "../redux/actions/auth";
import { useDispatch } from "react-redux";
const Auth = () => {
  const dispatch = useDispatch();
  const [signUp, setSingUp] = useState(true);
  const [authData, setAuthData] = useState({ username: "", password: "", email: "" });

  const onChangeFun = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };
  console.log(authData);

  const authFun = () => {
    if (signUp) {
      dispatch(registerAction(authData));
    } else {
      dispatch(loginAction(authData));
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-50">
      <div className="w-2/4 bg-white p-3 ">
        <h1 className="text-center text-2xl text-indigo-600 font-bold ">
          {signUp ? "Kayıt Ol" : "Giriş"}
        </h1>
        <div className="flex flex-col space-y-5 mt-5">
          {signUp && (
            <input
              value={authData.username}
              name="username"
              onChange={onChangeFun}
              type="text"
              placeholder="Username"
              className="input-styles"
            />
          )}
          <input
            value={authData.password}
            name="password"
            onChange={onChangeFun}
            type="password"
            placeholder="Password"
            className="input-styles"
          />
          <input
            value={authData.email}
            name="email"
            onChange={onChangeFun}
            type="email"
            placeholder="Email"
            className="input-styles"
          />
        </div>
        <div className="text-red-500 text-xs cursor-pointer mt-4 flex flex-col ">
          {signUp ? (
            <span onClick={() => setSingUp(false)}> Daha Önce Giriş Yaptınız mı ?</span>
          ) : (
            <span onClick={() => setSingUp(true)}>Kayıt Olmak için Tıklayıznız</span>
          )}
        </div>
        <div
          onClick={authFun}
          className="cursor-pointer hover:bg-indigo-900 w-full p-2 text-center bg-indigo-500 text-white rounded-lg mt-5"
        >
          {signUp ? "  Kayıt Ol" : "Giriş Yap"}
        </div>
      </div>
    </div>
  );
};

export default Auth;
