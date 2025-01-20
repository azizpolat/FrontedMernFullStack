const postReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case "GET_Posts":
      return {
        ...state,
        posts: action.payload,
      };

    case "Create_Posts":
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    case "Update_Posts":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case "Delete_Posts":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    default:
      return state;
  }
};

export default postReducer;
