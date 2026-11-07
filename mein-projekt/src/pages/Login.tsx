import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { useAuthStore } from "../stores/authStore";


function Login() {
  const loadUser = useAuthStore((state) => state.loadUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const user = useAuthStore((state) => state.user);
  

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({ email, password }),
    })
      const data = await response.json();
      if (response.ok) {
        setError("");
        await loadUser();
      } else {
        setError(data.error);
      }      
    } catch (error) {
      console.error("Fehler beim Login:", error);
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title={user ? `Hallo, ${user.name}!` : "Willkommen zurück."}
      description={user ? "Du bist angemeldet." : "Melde dich mit deiner E-Mail-Adresse an."}>
      {user ? <Link className="button" to="/">Zur Kollektion</Link> : <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-Mail</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Passwort</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            required
          />
        </div>

        <button className="button" type="submit" disabled={submitting}>{submitting ? "Wird angemeldet…" : "Anmelden"}</button>
        {error && <p className="notice error" role="alert">{error}</p>}
      </form>
      <p className="auth-switch">Neu bei MYSHOP? <Link to="/register">Konto erstellen</Link></p>
      </>}
    </AuthLayout>
  );
}

export default Login;
