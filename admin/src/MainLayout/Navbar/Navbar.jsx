import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { auth, setAuth } = useAuth();

  return (
    <nav id="layout-nav">
      <ul>
        {auth ? (
          <>
            <p>Hello {auth?.username}!</p>
            <a onClick={() => setAuth(null)}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
            </a>
            <p>Database</p>
            <Link to={"/product"}>
              <i className="fa-solid fa-user"></i>Products
            </Link>
          </>
        ) : (
          <p>Login</p>
        )}
      </ul>
    </nav>
  );
}
