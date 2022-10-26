import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navi() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav>
      <h1>메모장</h1>
      <ul>
        {!user && (
          <>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            <button type="button" onClick={logout}>
              로그아웃
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
