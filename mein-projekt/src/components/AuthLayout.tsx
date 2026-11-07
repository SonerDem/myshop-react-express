import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";

export default function AuthLayout({ title, description, children }: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="shell page auth-page">
      <Link className="back-link" to="/"><Icon name="back" /> Zum Shop</Link>
      <div className="auth-layout">
        <div className="auth-panel">
          <p className="eyebrow">DEIN MYSHOP-KONTO</p>
          <h1>{title}</h1>
          <p className="auth-panel__description">{description}</p>
          {children}
        </div>
        <div className="auth-art" aria-hidden="true">
          <p className="eyebrow">THE EVERYDAY EDIT</p>
          <img src="/products/tshirt.svg" alt="" />
          <p>Einfach gut angezogen.</p>
        </div>
      </div>
    </section>
  );
}
