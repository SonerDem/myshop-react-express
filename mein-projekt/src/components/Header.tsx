import { Link } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";


function Header() {
  const items = useCartStore((state) => state.items);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);


  return (
    <header>
      <div>
        <Link to="/">MYSHOP</Link>
      </div>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Warenkorb({totalQuantity})</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;