import { useState} from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();    
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
    }
  }

  return (
    <div>
      <h1>Registrieren</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            name="name"
          />
        </div>

        <div>
          <label htmlFor="email">E-Mail</label>
          <input value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"                                                
            id="email"
            name="email"
          />
        </div>

        <div>
          <label htmlFor="password">Passwort</label>
          <input value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
          />
        </div>      

        <button type="submit">Registrieren</button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}

export default Register;