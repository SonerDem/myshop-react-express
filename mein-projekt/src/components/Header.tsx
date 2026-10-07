import { Link } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";


function Header() {
  const items = useCartStore((state) => state.items);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);


  return (
    <header>
      <div className="header__inner">
        <Link to="/">MYSHOP</Link>
      

      <nav className="header__nav">
        <Link to="/">Home</Link>
        <Link to="/cart">Warenkorb({totalQuantity})</Link>
        <Link to="/login">Login</Link>
      </nav>
      </div>
    </header>
  );
}

export default Header;