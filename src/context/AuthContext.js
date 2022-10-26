// context 는 컴포넌트에서 공통으로 state 를 참조하게 해줌.

import { appAuth } from "../firebase/config";

// 인증정보를 저장 및 관리함.
const { createContext, useReducer, useEffect } = require("react");
// context 객체를 생성한다.
const AuthContext = createContext();
const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      console.log("로그인OK ", action.payload);
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };

    case "authIsReady":
      return { ...state, user: action.payload, isAuthReady: true };

    default:
      return state;
  }
};

//  생성된 context 를 구독할 컴퍼넌트의 묶음 범위를 설정.
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthReady: false,
  });

  // 유저 인증정보 변화를 관찰함.
  useEffect(() => {
    const unsubscribe = appAuth.onAuthStateChanged(function (user) {
      dispatch({ type: "authIsReady", payload: user });
      unsubscribe();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthContextProvider };
