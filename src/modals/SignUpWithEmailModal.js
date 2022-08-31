import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRef } from "react";
import { useEffect } from "react";
import {
  getCreateUserListener,
  multiQueryCollection,
  queryCollection,
  setDocInFirestore,
} from "../misc/handleFirestore";
import miscStore from "../stores/miscStore";
import useOnHover from "./useOnHover";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

const SignUpWithEMailModal = () => {
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const { closeModal, setInfo } = miscStore();
  const [switching, setSwitching] = useState(false);
  const [mode, setMode] = useState("signIn");
  const [method, setMethod] = useState("username");
  const [error, setError] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const signupUserNameRef = useRef(null);

  const onKeyEmail = (e) => {
    if (e.key == "Enter") passwordRef.current.focus();
  };

  const onKeyUsername = (e) => {
    if (e.key == "Enter") emailRef.current.focus();
  };

  function signIn() {
    if (method == "email") {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          setUser({ email: "", password: "" });
          const fireUser = userCredential.user;
          getCreateUserListener(
            "users",
            "uid",
            "==",
            fireUser.uid,
            (unsubscribe, result) => {
              if (result != null) {
                setInfo(result);
                unsubscribe();
              }
            }
          );
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(error.code);
          setUser({ email: "", password: "", username: "" });
          emailRef.current.focus();
          console.log(
            "errorCode - ",
            errorCode,
            "\n errorMessage - ",
            errorMessage
          );
        });
    } else {
      setSwitching(true);
      multiQueryCollection(
        "users",
        [
          ["username", "==", user.username],
          ["password", "==", user.password],
        ],
        (result) => {
          if (result.length > 0) {
            closeModal();
            let userInfo = result[0];
            setInfo(userInfo);
          } else {
            setSwitching(false);
            setError("User not Found");
          }
        }
      );
    }
  }

  function createNewUser(uid) {
    let newUser = {
      uid,
      email: user.email,
      password: user.password,
      username: user.username,
    };
    setDocInFirestore("users", uid, newUser, () => {
      localStorage.setItem("info", JSON.stringify(newUser));
      setInfo(newUser);
      setUser({ email: "", password: "", username: "" });
      closeModal();
    });
  }

  async function signUp() {
    console.log("test 1");
    if (user.email.length > 3 && user.password.length > 3) {
      console.log("test 2");
      queryCollection(
        "users",
        "username",
        "==",
        user.username.toLowerCase(),
        (result) => {
          console.log("result - ", result);
          if (result.length < 1) {
            setSwitching(true);
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, user.email, user.password)
              .then((userCredential) => {
                const fireUser = userCredential.user.uid;
                createNewUser(fireUser);
              })
              .catch((error) => {
                setSwitching(false);
              });
          } else toast("username already taken");
        }
      );
    }
  }

  const onKeyPassword = (e) => {
    if (e.key == "Enter") {
      if (mode == "signUp") signUp();
      else signIn();
    }
  };

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, [emailRef]);
  return (
    <div
      className="divColumnColored"
      style={{
        width: "400px",
        borderRadius: "1rem/1rem",
        border: "1px solid white",
        position: "relative",
      }}
    >
      {switching && (
        <div
          className="divRow"
          style={{ position: "absolute", alignSelf: "center" }}
        >
          <LoadingSpinner size={40} />{" "}
        </div>
      )}
      {!switching && (
        <div className="divColumn" style={{ width: "100%" }}>
          <div
            className="divRow"
            style={{ width: "100%", justifyContent: "space-around" }}
          >
            <SignTextHolder
              mode={mode}
              setUser={setUser}
              setMode={setMode}
              id={"signIn"}
              setMethod={setMethod}
              text={"Sign in "}
              setError={setError}
            />
            <SignTextHolder
              mode={mode}
              setMethod={setMethod}
              setUser={setUser}
              setMode={setMode}
              setError={setError}
              id={"signUp"}
              text={"Sign up"}
            />
          </div>

          {mode == "signUp" && (
            <div className="divColumn">
              <div
                className="textWhite"
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                Username
              </div>
              <input
                onKeyDown={onKeyUsername}
                ref={signupUserNameRef}
                value={user.username}
                onChange={(e) => {
                  setUser({ ...user, username: e.target.value });
                }}
                style={{ textAlign: "center" }}
              />
            </div>
          )}

          <div
            className="divRow"
            style={{
              width: "50%",
              justifyContent: "space-around",
              marginTop: "10px",
            }}
          >
            <MethodHolder
              text={"Email"}
              id={"email"}
              method={method}
              setMethod={setMethod}
            />
            {mode == "signIn" && (
              <MethodHolder
                text={"Username"}
                id={"username"}
                method={method}
                setMethod={setMethod}
              />
            )}
          </div>

          <div className="divRow">
            <input
              onKeyDown={onKeyEmail}
              ref={emailRef}
              value={user[method]}
              onChange={(e) => {
                setUser({ ...user, [method]: e.target.value });
              }}
              style={{ textAlign: "center" }}
            />

            <img src={`/images/icons/icon_${method}.png`} className="icon20" />
          </div>

          <div
            className="textWhite"
            style={{ width: "100%", textAlign: "center", marginTop: "10px" }}
          >
            Password
          </div>
          <div className="divRow" style={{ marginBottom: "5px" }}>
            <input
              ref={passwordRef}
              onKeyDown={onKeyPassword}
              autoComplete="new-password"
              value={user.password}
              type="password"
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              style={{ textAlign: "center" }}
            />
            <img src="/images/icons/icon_locked.png" className="icon20" />
          </div>
          {error && (
            <div className="divRow" style={{ width: "100%" }}>
              <div
                className="textWhiteSmall"
                style={{ color: "red", textAlign: "center", width: "100%" }}
              >
                {error}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const MethodHolder = ({ text, id, setMethod, method }) => {
  const hover = useOnHover({ item: id, active: method });
  return (
    <div
      {...hover.divProps}
      className="textWhite"
      style={{ color: hover.textColor }}
      onClick={() => {
        setMethod(id);
      }}
    >
      {text}
    </div>
  );
};

const SignTextHolder = ({ mode, setMode, text, id, setError, setMethod }) => {
  const hover = useOnHover({ item: id, active: mode });
  return (
    <div
      {...hover.divProps}
      onClick={() => {
        setError("");
        if (id == "signUp") setMethod("email");
        setMode(id);
      }}
      className="textBoldWhite"
      style={{ width: "100%", textAlign: "center", color: hover.textColor }}
    >
      {text}
    </div>
  );
};

export default SignUpWithEMailModal;
