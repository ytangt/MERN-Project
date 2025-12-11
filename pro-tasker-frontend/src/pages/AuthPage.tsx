import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const navigate = useNavigate();
  console.log("BACKEND URL =>", import.meta.env.VITE_BACKEND_URL);

  //get AuthContext
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext is not provided");
  }

  const { login, register } = auth;

  const [showRegister, setShowRegister] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //HandleLogin
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
      setError("");
      setLoading(true);
     
      const success = await login(email, password);

      if (!success) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      navigate("/projects");
      setLoading(false);
  };

  //Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
      setError("");
      setLoading(true);

      const success = await register({username,email,password
      });

      if (!success) {
        setError("Registration failed");
        return;
      }

      const autoLoginSuccess = await login(email, password);
      //Auto Login
      if (!autoLoginSuccess) {
        setError("Auto login failed");
        setLoading(false);
        return;
      }
      navigate("/projects");
      setLoading(false);
      return;
      
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <h1 className="text-center mb-3">
        Start managing your projects.
      </h1>

      {/* ERROR  */}
      {error && <div className="alert alert-danger py-2">{error}</div>}

      {/* FORM  */}
      {showRegister ? (
        <form
          onSubmit={handleRegister}
        >
          <div>Register</div>

          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              id=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              id=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              id=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <input
            type="submit"
            value="Register"
          />

          {/* LOADING  */}
          {loading && <div>...</div>}
        </form>
      ) : (
        <form
          onSubmit={handleLogin}
        >
          <div>Login</div>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              id=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              id=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <input
            type="submit"
            value="Login"
          />

          {/* LOADING  */}
          {loading && <div className="animate-pulse">...</div>}
        </form>
      )}

      {/* TOGGLE FORM  */}
      {showRegister ? (
        <div>
          Already have an account?{" "}
          <span
            onClick={() => setShowRegister(false)}
          >
            Sign in
          </span>{" "}
        </div>
      ) : (
        <div>
          Don't have an account?{" "}
          <span
            onClick={() => setShowRegister(true)}
          >
            Sign up
          </span>{" "}
        </div>
      )}
    </div>
  );
}

export default AuthPage;