import React, { useState } from "react";
import axios from "axios"


function Register() {
  const [input, setInput] = useState({
    username: "",
    password: ""
  });
  const [login, setLogin] = useState({
    loginUsername: "",
    loginPassword: ""
  });


  const inputHandleChange = e => {
    e.preventDefault()
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
  };

  const loginHandleChange = e => {
    e.preventDefault()
    setLogin({
        ...login,
        [e.target.name]: e.target.value
    })
  };

   function registerSubmit(e){
      e.preventDefault()
      axios.post("http://localhost:3300/api/auth/register", input)
      .then(res => {
          console.log("res",res)
          setInput({
            username: "",
            password: ""
        })
      })
      .catch(err => console.log("err",err))
  }

  function loginSubmit(e){
    e.preventDefault()
    axios.post("http://localhost:3300/api/auth/register", login)
    .then(res => {
        console.log("res",res)
        setLogin({
          loginUsername: "",
          loginPassword: ""
      })
    })
    .catch(err => console.log("err",err))
}

  return (
    <div>
        <h1>registration</h1>
      <form onSubmit = {registerSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={input.username}
          onChange={inputHandleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          value={input.password}
          onChange={inputHandleChange}
        />
        <button type="submit">submit</button>
      </form>
      <br/><br/><br/><br/>
      <h2>Log in</h2>
      <form onSubmit = {loginSubmit}>
        <input
          type="text"
          name="loginUsername"
          placeholder="username"
          value={login.loginUsername}
          onChange={loginHandleChange}
        />
        <input
          type="text"
          name="loginPassword"
          placeholder="password"
          value={login.loginPassword}
          onChange={loginHandleChange}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Register;
