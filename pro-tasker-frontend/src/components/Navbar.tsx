import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function Navbar() {
    const auth = useContext(AuthContext);
    return (
      <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/projects">Projects</Link> |{" "}

    {auth?.user ? (
        <>
          <span>{auth.user.username}</span>{" "}
          <button onClick={auth.logOut}>Logout</button>
        </>
      ) : (
        <Link to="/auth">Login / Register</Link>
      )}
    </nav>
  );
}

export default Navbar;