const authReducer = (state = { auth: null }, action) => {
  switch (action.type) {
    case "Kayıt Ol":
      localStorage.setItem("auth", JSON.stringify(action.payload));
      return {
        ...state,
        auth: action.payload,
      };

    case "Giriş":
      localStorage.setItem("auth", JSON.stringify(action.payload));
      return {
        ...state,
        auth: action.payload,
      };

    case "Cıkış Yap":
      localStorage.clear();
      return {
        ...state,
        auth: null,
      };

    default:
      return state;
  }
};

export default authReducer;
