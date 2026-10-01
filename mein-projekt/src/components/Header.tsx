import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div>
        <Link to="/">MYSHOP</Link>
      </div>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Produkte</Link>
        <Link to="/cart">Warenkorb</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;