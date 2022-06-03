import React, { useState } from "react";
import Close from "../../assets/img/close-eye.svg";
import Open from "../../assets/img/open-eye.svg";
import AuthService from "../../services/AuthService";
import { Redirect } from "react-router-dom";
import IsAuthenticated from "../../services/VerifyToken";
import { Container, Img } from "./styles";


function Login() {
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [hidden, sethidden] = useState(false);

  const togglePassword = () => {
    sethidden(!hidden);
  };

  const submit = () => {
    setloading(true);
    AuthService(username, password).then(
      (success) => {
        localStorage.setItem("TOKEN", success.access_token);
        seterror(false);
        setloading(false);
      },
      (error) => {
        console.log(error);
        seterror(true);
        setloading(false);
      }
    );
  };

  return (
    <Container>
      <div className="card">
        <div className="card-header">
          <h1>Welcome</h1>
          <h2>Please Enter Your Credentials</h2>
        </div>
        <form>
          <div className="card-body">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              defaultValue=""
              onChange={(e) => setusername(e.target.value)}
            />
            <div className="input-password">
              <input
                type={hidden ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                defaultValue=""
                onChange={(e) => setpassword(e.target.value)}
              />
              <Img
              style={{margin:'3px'}}
                src={hidden ? Close : Open}
                onClick={() => togglePassword()}
              />
            </div>
            <button
              className="btn btn-info"
              type="button"
              onClick={() => submit()}
            >
              <span> {loading ? "Loading..." : "SignIn"} </span>
            </button>
          </div>
          {error ? (
            <div className="error">
              <span>
                Oops, we were unable to process your request. Check your
                Username and Password
              </span>
            </div>
          ) : (
            <div></div>
          )}
        </form>
      </div>
      {IsAuthenticated() ? <Redirect to="/home" /> : <Redirect to="/" />}
    </Container>
  );
}

export default Login;
