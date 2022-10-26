import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isPending, login } = useLogin();
  const handleData = (event) => {
    if (event.target.type === "email") {
      setEmail(event.target.value);
    } else if (event.target.type === "password") {
      setPassword(event.target.value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>로그인</legend>
        <label>email : </label>
        <input type="email" required value={email} onChange={handleData} />
        <label>password : </label>
        <input
          type="password"
          required
          value={password}
          onChange={handleData}
        />
        {!isPending && <button type="submit">로그인</button>}
        {isPending && <strong>로그인 진행 중...</strong>}
        {error && <strong>{error}</strong>}
      </fieldset>
    </form>
  );
}
