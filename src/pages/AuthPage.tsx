import { useState } from "react";
import AuthForm from "../components/AuthForm";
import css from "../styles/AuthPage.module.css";

export default function AuthPage() {
  const [isSignup, setSignup] = useState(true);

  return (
    <div className={css.auth_card}>
      <div className={css.left}>
        <h1>Meeting Room Booking App</h1>
        <p>Registration and booking management.</p>
      </div>
      <div className={css.right}>
        <h3>{isSignup ? "Signup" : "Login"}</h3>
        <AuthForm
          isSignup={isSignup}
        />
        {isSignup && (
          <p className={css.bottom}>
            Already have an account?
            <button
              className={css.login_btn}
              type="button"
              onClick={() => setSignup(false)}
            >
              Login.
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
