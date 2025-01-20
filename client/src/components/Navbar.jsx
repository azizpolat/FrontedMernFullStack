import React from "react";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const dispatch = useDispatch();

  const logoutFun = () => {
    localStorage.clear();
    window.location = "/auth";
  };

  const openModal = () => {
    dispatch({ type: "Modal", payload: true });
  };

  return (
    <div className="h-20 bg-indigo-600 flex items-center justify-between px-5">
      <div className="text-white font-bold cursor-pointer text-2xl">POST PAYLAŞ</div>
      <div className="flex items-center space-x-5 text-xl">
        <input className="rounded-lg outline-none p-2" type="text" placeholder="Ara" />
        <div
          onClick={openModal}
          className="w-36 border p-2 rounded-lg text-center text-white cursor-pointer "
        >
          Post Paylaş
        </div>
        <BiLogOut
          onClick={logoutFun}
          size={25}
          className="text-white cursor-pointer hover:opacity-50"
        />
      </div>
    </div>
  );
};

export default Navbar;
