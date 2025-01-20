# FrontedMernFullStack

const postReducer = async (state = { posts: [] }, action) => {
switch (action.type) {
case "GET_Posts":
return {
post: action.payload,
};

    case "Create_Posts":
      return {
        post: [...state.posts, action.payload],
      };

    case "Update_Posts":
      return {
        post: [
          state.posts.map((post) =>
            post._id === action.payload._id ? action.payload : post
          ),
        ],
      };

    case "Delete_Posts":
      return {
        post: [state.posts.filter((post) => post.id !== action.payload)],
      };

    default:
      return state;

}
};

export default postReducer;
