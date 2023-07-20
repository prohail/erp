import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="container my-5 text-center">
      <form className="my-5" onSubmit={handleSubmit}>
        <h3>Log In</h3>

        <input
          className="w-25 border-bottom my-2 border-0 border-secondary px-3 pt-3 pb-1"
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <input
          className="w-25 border-bottom my-2 border-0 border-secondary px-3 pt-3 pb-1"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button className="btn btn-success my-4" disabled={isLoading}>
          Log in
        </button>
        {error && (
          <div className="alert alert-danger w-25 mx-auto">{error}</div>
        )}
      </form>
    </div>
  );
};

export default Login;
