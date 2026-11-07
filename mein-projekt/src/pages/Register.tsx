import { useState} from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setError("");
        setSuccess("Benutzer erfolgreich registriert.");
      } else {
        setSuccess("");
        setError("Fehler bei der Registrierung: " + data.error);
      }
    } catch (error) {
      console.error("Fehler bei der Registrierung:", error);
      setSuccess("");
      setError("Fehler bei der Registrierung.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout title="Konto erstellen." description="Registriere dich mit deinem Namen und deiner E-Mail-Adresse.">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            required
          />
        </div>

        <div>
          <label htmlFor="email">E-Mail</label>
          <input value={email}
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
          <input value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            required
          />
        </div>      

        <button className="button" type="submit" disabled={submitting}>{submitting ? "Konto wird erstellt…" : "Registrieren"}</button>

        {error && <p className="notice error" role="alert">{error}</p>}
        {success && <p className="notice success" role="status">{success} <Link to="/login">Jetzt anmelden</Link></p>}
      </form>
      <p className="auth-switch">Schon ein Konto? <Link to="/login">Anmelden</Link></p>
    </AuthLayout>
  );
}

export default Register;
