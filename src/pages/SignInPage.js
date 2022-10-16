import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInPage.css";
import { auth } from "../firebase";


const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const onCreateAccountButtonClick = useCallback(() => {
  //   navigate("/");
  // }, [navigate]);

  // const onSignInButtonClick = useCallback(() => {
  //   navigate("/");
  // }, [navigate]);

  const onSignInButtonClick = (e) => {
    e.preventDefault(); //prevent page from getting refresh

    // firebase login
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  const onCreateAccountButtonClick = (e) => {
    e.preventDefault();

    // firebase register
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // successfully created a new user with email & password
        console.log(auth);
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <main className="signinpage-main">
      <div className="background-div1" />
      <section className="signin-section">
        <button
          className="create-account-button"
          onClick={onCreateAccountButtonClick}
        >
          <div className="create-button-div" />
          <div className="create-your-account">Create your Account</div>
        </button>
        <h2 className="sign-in-title-h2">Sign-in</h2>
        <form className="sign-in-content-form" method="post">
          <div className="password-div">
            <div className="password-div1">Password</div>
            <input
              className="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="email-div">
            <div className="email-div1">Email</div>
            <input
              className="password-input"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="sign-in-button" onClick={onSignInButtonClick}>
            <button className="button" />
            <div className="sign-in-div">Sign-in</div>
          </button>
        </form>
        <p className="by-signing-in-you-agrees-flori">
          By Signing in you agrees FLORISTA terms and conditions
        </p>
      </section>
    </main>
  );
};

export default SignInPage;
