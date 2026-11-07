import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";
import { useAuthStore } from "../stores/authStore";
import Icon from "./Icon";

export default function Header() {
  const { user, loading, error, logout, loggingOut } = useAuthStore();
  const quantity = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <header className="header">
      <div className="shell header__inner">
        <Link to="/" className="brand"><span className="brand__mark"><Icon name="mark" /></span> MYSHOP<span className="brand__period">.</span></Link>
        <nav className="header__nav" aria-label="Hauptnavigation">
          <NavLink to="/" end className="nav-link">Kollektion</NavLink>
          <NavLink to="/cart" className="nav-link"><Icon name="bag" /> <span>Warenkorb</span> <span className="cart-count">{quantity}</span></NavLink>
          {loading ? <span className="header__status" role="status">Anmeldung wird geprüft…</span> : user ? (
            <div className="header__account">
              <span className="header__greeting">Hallo, {user.name}!</span>
              <button className="text-button" type="button" onClick={() => void logout()} disabled={loggingOut}>
                {loggingOut ? "Wird abgemeldet…" : "Abmelden"}
              </button>
            </div>
          ) : <NavLink to="/login" className="nav-link"><Icon name="user" /> Anmelden</NavLink>}
        </nav>
      </div>
      {error && <p className="shell header__error" role="alert">{error}</p>}
    </header>
  );
}
