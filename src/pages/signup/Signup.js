import React, { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleChange = (event) => {
    if (event.target.type === "email") {
      setEmail(event.target.value);
    } else if (event.target.type === "password") {
      setPassword(event.target.value);
    } else if (event.target.type === "text") {
      setDisplayName(event.target.value);
    }
  };
  // API 연동을 위해서 초기화
  const { error, isPending, signup } = useSignup();
  const handleSubmit = (event) => {
    event.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>회원가입</legend>
        <label>Email: </label>
        <input type="email" required value={email} onChange={handleChange} />
        <label>Password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={handleChange}
        />
        <label>Nickname: </label>
        <input
          type="text"
          required
          value={displayName}
          onChange={handleChange}
        />

        <button type="submit">회원가입신청</button>
      </fieldset>
    </form>
  );
}
