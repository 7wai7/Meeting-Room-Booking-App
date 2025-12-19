import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFieldErrors from "../hooks/useFieldErrors";
import { useUser } from "../hooks/useUser";
import { login, register } from "../services/api";
import css from "../styles/AuthPage.module.css";
import type { AuthData } from "../types/AuthData";
import { FieldError } from "../utils/FieldError";

interface Props {
  isSignup: boolean;
}

export default function AuthForm({ isSignup }: Props) {
  const [authData, setAuthData] = useState<Partial<AuthData>>({});
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { errors: authErrors, showErrors } = useFieldErrors();

  const onSubmit = () => {
    (isSignup ? register : login)(authData as AuthData)
      .then((user) => {
        setUser(user);
        navigate("/");
      })
      .catch((err) => {
        if (err instanceof FieldError) showErrors(err.fields);
      });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {isSignup && (
        <>
          <input
            type="text"
            id="regName"
            required
            placeholder="Name"
            value={authData?.name || ""}
            onChange={(e) => setAuthData({ ...authData, name: e.target.value })}
          />
          {authErrors.name && (
            <p className={css.error_message}>{authErrors.name.message}</p>
          )}
        </>
      )}
      <input
        type="email"
        id="regEmail"
        required
        placeholder="Email"
        value={authData?.email || ""}
        onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
      />
      {authErrors.email && (
        <p className={css.error_message}>{authErrors.email.message}</p>
      )}
      <input
        type="password"
        id="regPassword"
        required
        placeholder="Password"
        value={authData?.password || ""}
        onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
      />
      {authErrors.password && (
        <p className={css.error_message}>{authErrors.password.message}</p>
      )}
      <button
        type="submit"
        className={css.submit_btn}
        disabled={
          isSignup
            ? !(authData.name && authData.email && authData.password) // signup
            : !(authData.email && authData.password) // login
        }
      >
        {isSignup ? "Signup" : "Login"}
      </button>
    </form>
  );
}
