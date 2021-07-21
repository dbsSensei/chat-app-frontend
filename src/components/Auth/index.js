import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import LoginModal from "react-login-modal";

import "./style.css";

const urlAPI = "http://localhost:3001";

const Auth = () => {
  const user = localStorage.getItem("user");
  const [isLogin, setIsLogin] = useState(false);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) setIsLogin(true);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSignup = async (username, email, password) => {
    try {
      const signUp = await axios({
        method: "post",
        url: `${urlAPI}/api/v1/users/signup`,
        data: {
          name: username,
          userName: username,
          email: email,
          password: password,
          passwordConfirm: password,
        },
      });
      localStorage.setItem("token", signUp.data.token);
      localStorage.setItem("user", JSON.stringify(signUp.data.data.user));
      setIsLogin(true);
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const login = await axios({
        method: "post",
        url: `${urlAPI}/api/v1/users/login`,
        data: {
          userName: username,
          password: password,
        },
      });
      localStorage.setItem("token", login.data.token);
      localStorage.setItem("user", JSON.stringify(login.data.data.user));
      setIsLogin(true);
    } catch (err) {
      // console.log(err.response.data);
      alert(err.response.data.message);
    }
  };

  const logoutHandler = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return isLogin ? (
    <Button
      className={"authNavButton"}
      variant="primary"
      onClick={logoutHandler}
    >
      Logout
    </Button>
  ) : (
    <>
      <Button
        className={"authNavButton"}
        variant="primary"
        onClick={handleShow}
      >
        Login
      </Button>

      <Modal style={{ margin: "10% auto" }} show={show} onHide={handleClose}>
        <Modal.Body>
          <LoginModal
            handleSignup={handleSignup}
            handleLogin={handleLogin}
            buttonColor={"#52AE64"}
            disabledButtonColor={"#C7E4CD"}
            buttonHoverColor={"#A7D5B0"}
            fontFamily={"roboto"}
            errorMessage={errorMessage}
            errorEnable={errorMessage}
          />
        </Modal.Body>
        {/* <Modal.Footer> */}
        <Button
          className={"modalCloseButton"}
          variant="secondary"
          onClick={handleClose}
        >
          x
        </Button>
        {/* </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default Auth;
