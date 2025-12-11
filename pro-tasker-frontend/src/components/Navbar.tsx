import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function Navbar() {
    const auth = useContext(AuthContext);
    return (
      <nav className="navbar navbar-dark bg-dark px-3 mb-4">
      <Link className="navbar-brand fw-bold" to="/">Home</Link> |{" "}
      <Link className="navbar-brand fw-bold" to="/projects">Projects</Link> |{" "}

    {auth?.user ? (
        <>
          <span>{auth.user.username}</span>{" "}
          <button className="btn btn-outline-light btn-sm" onClick={auth.logOut}>Logout</button>
        </>
      ) : (
        <Link className="navbar-brand fw-bold" to="/auth">Login / Register</Link>
      )}
    </nav>
  );
}

export default Navbar;