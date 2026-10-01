import { Link } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Shop</Link>
          <Link to="/products">Produkte</Link>
          <Link to="/cart">Warenkorb</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      <main>
        {/* Seiteninhalt */}
      </main>

      <footer>
        <p>© 2026 Mein Shop</p>
      </footer>
    </div>
  );
}

export default MainLayout;