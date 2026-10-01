import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function MainLayout() {
  return (
    <div>
      <Header />

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2026 MYSHOP</p>
      </footer>
    </div>
  );
}

export default MainLayout;