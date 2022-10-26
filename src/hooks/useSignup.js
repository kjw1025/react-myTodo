import { useState } from "react";
import { appAuth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { useAuthContext } from "./useAuthContext.js";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  // 유저 정보를 전역에서 사용할 수 있도록 dispatch 함수를
  // 이용해서 업데이트 한다.
  const { dispatch } = useAuthContext();

  const signup = (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    createUserWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        if (!user) {
          throw new Error("회원가입에 실패했습니다.");
        }
        updateProfile(appAuth.currentUser, { displayName })
          .then(() => {
            // contex 를 업데이트 한다.
            dispatch({ type: "login", payload: user });

            setError(null);
            setIsPending(false);
          })
          .catch((err) => {
            setError(err.message);
            setIsPending(false);
            console.log(err.message);
          });
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
        console.log(err.message);
      });
  };

  return { error, isPending, signup };
};
