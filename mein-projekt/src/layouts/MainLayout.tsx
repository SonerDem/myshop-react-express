import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

function MainLayout() {
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    const controller = new AbortController();
    void loadUser(controller.signal);
    return () => controller.abort();
  }, [loadUser]);

  return (
    <div className="shop-layout">
      <a className="skip-link" href="#inhalt">Zum Inhalt</a>
      <Header />

      <main id="inhalt" className="shop-main" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="shell footer__inner">
          <Link className="brand" to="/">MYSHOP<span className="brand__period">.</span></Link>
          <p>© {new Date().getFullYear()} MYSHOP</p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
