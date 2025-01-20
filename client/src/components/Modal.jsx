import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction, updatePostAction } from "../redux/actions/post";
import { toast } from "react-toastify";
const Modal = () => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({ user: "", title: "", description: "" });

  const onChangeFun = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const { modal } = useSelector((state) => state.modal);

  const postCreate = () => {
    if (modal?.updateId) {
      dispatch(updatePostAction(modal?.updateId, postData));
    } else {
      dispatch(createPostAction(postData));
    }
    dispatch({ type: "Modal", payload: false });
    toast.info("Ekleme İşlemi Basarılı", {
      position: "top-right",
      autoClose: 5000,
    });
  };

  return (
    <div className="w-full h-screen bg-opacity-50 bg-black fixed top-0 left-0 bottom-0 right-0 z-50 flex items-center justify-center">
      <div className="bg-white w-2/4 p-2 rounded-lg">
        <div className="flex flex-row items-center  justify-between ml-4 mr-4">
          <h1 className="text-center font-bold  text-2xl">
            {modal?.updateId ? "POST Güncelle" : "POST Paylaş"}
          </h1>
          <IoClose
            onClick={() => dispatch({ type: "Modal", payload: false })}
            size={25}
            className="cursor-pointer"
          />
        </div>
        <div className="my-4 flex flex-col space-y-4">
          <input
            value={postData.user}
            name="user"
            onChange={onChangeFun}
            className="input-styles"
            type="text"
            placeholder="User"
          />
          <input
            value={postData.title}
            name="title"
            onChange={onChangeFun}
            className="input-styles"
            type="text"
            placeholder="Title"
          />
          <input
            value={postData.description}
            name="description"
            onChange={onChangeFun}
            className="input-styles"
            type="text"
            placeholder="Description"
          />
        </div>
        <div
          onClick={postCreate}
          className="text-center text-white bg-indigo-600 rounded-lg p-2 cursor-pointer hover:bg-indigo-900 "
        >
          {modal?.updateId ? "Güncelle" : "Paylaş"}
        </div>
      </div>
    </div>
  );
};

export default Modal;
