import React from "react";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deletePostAction } from "../redux/actions/post";
import { toast } from "react-toastify";

const HomeCart = ({ post }) => {
  const dispatch = useDispatch();
  console.log(post);

  const deletePost = (id) => {
    dispatch(deletePostAction(id));
    window.location.reload();
    toast.info("Silme İşlemi Basarılı", {
      position: "top-right",
      autoClose: 5000,
    });
  };

  const updatePost = (id) => {
    dispatch({ type: "Modal", payload: { open: true, updateId: id } });
  };
  return (
    <div className=" relative w-1/4 border p-3 rounded-lg bg-gray-50">
      <div className="font-bold text-xl">{post?.title}</div>
      <div className="text-gray-700 text-sm">{post?.description}</div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-gray-500 ">{post?.user}</span>
        <span className="text-xs text-gray-500 ">{post?.date?.substring(0, 10)}</span>
      </div>
      <div className="absolute -top-3 -right-0 flex items-center space-x-3">
        <MdDelete
          onClick={() => deletePost(post._id)}
          size={22}
          className="bg-red-500 rounded-lg text-white p-1 cursor-pointer"
        />
        <GrUpdate
          onClick={() => updatePost(post._id)}
          size={22}
          className="bg-red-500 rounded-lg text-white p-1 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default HomeCart;
