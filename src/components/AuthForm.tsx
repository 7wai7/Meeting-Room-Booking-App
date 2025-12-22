import { useState } from "react";
import { useNavigate } from "react-router-dom";
import css from "../styles/AuthPage.module.css";
import type { AuthData } from "../types/AuthData";
import { useAuth } from "../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { ValidationError } from "../utils/ValidationError";

interface Props {
  isSignup: boolean;
}

export default function AuthForm({ isSignup }: Props) {
  const [authData, setAuthData] = useState<Partial<AuthData>>({});
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const { mutate: auth, error } = useMutation<void, ValidationError | Error, AuthData>({
    mutationFn: isSignup ? register : login,
    onSuccess: () => navigate("/"),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        auth(authData as AuthData);
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
          {error instanceof ValidationError && error?.fields.name && (
            <p className={css.error_message}>{error?.fields.name.message}</p>
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
      {error instanceof ValidationError && error?.fields.email && (
        <p className={css.error_message}>{error?.fields.email.message}</p>
      )}
      <input
        type="password"
        id="regPassword"
        required
        placeholder="Password"
        value={authData?.password || ""}
        onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
      />
      {error instanceof ValidationError && error?.fields.password && (
        <p className={css.error_message}>{error?.fields.password.message}</p>
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
