import axios from "axios";
import { toast } from "react-toastify";
export const getPostAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:5000/getPosts");

    dispatch({ type: "GET_Posts", payload: data });
  } catch (error) {
    toast.error(error.message, "Hata Meydana Geldi", {
      position: "top-right",
      autoClose: 5000,
    });
  }
};

export const createPostAction = (postData) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:5000/createPost", postData);

    dispatch({ type: "Create_Posts", payload: data });
  } catch (error) {
    console.log(error?.response?.data);

    toast.error(error.message, "Hata Meydana Geldi", {
      position: "top-right",
      autoClose: 5000,
    });
  }
};

export const updatePostAction =
  ({ id, postData }) =>
  async (dispatch) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/updatePost/${id}`,
        postData
      );

      dispatch({ type: "Update_Posts", payload: data });
    } catch (error) {
      toast.error(error.message, "Hata Meydana Geldi", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

export const deletePostAction = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/deletePost/${id}`);
    dispatch({ type: "Delete_Posts", payload: id });
  } catch (error) {
    toast.error(error.message, "Hata Meydana Geldi", {
      position: "top-right",
      autoClose: 5000,
    });
  }
};
