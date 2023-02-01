import {
  faAt,
  faKey,
  faRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Logo from "../../utils/assets/images/logo.png";
import Endpoints from "../../utils/repository/Endpoints";
import {
  GetRequest,
  NoAuthPostRequest,
} from "../../utils/repository/RequestMaker";
import { setIsRefreshed } from "../FileManager/fileMangerSlice";
import { addUser, setExpireAt, setLoginAt } from "./loginSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const body = document.getElementsByTagName("body")[0];
  const html = document.getElementsByTagName("html")[0];
  const root = document.getElementById("root");
  const user = useSelector((state) => state.login.user);

  const onSubmit = () => {
    setIsSubmitting(true);
    NoAuthPostRequest(
      JSON.stringify({ email, password }),
      Endpoints.login
    ).then((res) => {
      setIsSubmitting(false);
      if (res) {
        console.log("res", res.body);
        localStorage.setItem("token", res.body.token);
        const currentTime = new Date().toLocaleTimeString("de-DE");
        const _expireAt = new Date("01/01/1970 " + currentTime)
          .addHours(2)
          .toLocaleTimeString("de-DE");
        dispatch(addUser(res.body));
        dispatch(setLoginAt(currentTime));
        dispatch(setExpireAt(_expireAt));
        navigate("/");
      }
    });
  };

  useEffect(() => {
    if (user.token) {
      navigate("/");
      return;
    }
    localStorage.clear();
    body.style.backgroundImage = "none";
    html.style.backgroundImage = "none";
    root.style.backgroundImage = "none";
    dispatch(setIsRefreshed(false));
  }, []);

  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100%" }}
    >
      <div
        className="bg-mine defaultBackground"
        style={
          isPortrait
            ? { width: "100%", overflow: "hidden" }
            : { width: "70%", overflow: "hidden" }
        }
      >
        <div className="d-flex justify-content-end">
          <img src={Logo} height="70" />
        </div>
        <div style={isPortrait ? { padding: 0 } : { padding: 50 }}>
          <div className="display-4 mb-3">Welcome!</div>
          <FormInput
            type="email"
            id="user_email"
            placeholder="name@example.com"
            label="Email address"
            hint="enter your email address"
            icon={faAt}
            value={email}
            setValue={setEmail}
          />

          <FormInput
            type="password"
            id="user_password"
            placeholder="xxxxx"
            label="Password"
            hint="enter your password"
            icon={faKey}
            value={password}
            setValue={setPassword}
          />
          <div className="d-flex justify-content-end" style={{ marginTop: 20 }}>
            {isSubmitting ? (
              <div
                className="btn btn-primary d-flex align-items-center justify-content-center"
                style={{ height: 50, width: 100, transition: "0.3s" }}
                id="login_submitting"
              >
                <div
                  class="spinner-border text-light"
                  role="status"
                  //   style={{ height: 50, width: 50 }}
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <button
                className="btn btn-primary"
                style={{ height: 50, width: 100, transition: "0.3s" }}
                onClick={onSubmit}
              >
                Login <FontAwesomeIcon icon={faRightToBracket} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FormInput = ({
  type,
  id,
  placeholder,
  icon,
  hint,
  label,
  value,
  setValue,
}) => {
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        style={{}}
      />
      <label htmlFor={id}>
        <FontAwesomeIcon icon={icon} /> {label}
      </label>
      <div
        className="d-flex justify-content-end text-muted"
        style={{ fontSize: 12 }}
      >
        {hint}
      </div>
    </div>
  );
};
export default Login;
