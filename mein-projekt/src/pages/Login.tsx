import { useState } from "react";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({ email, password }),
    })
      const data = await response.json();
      if (response.ok) {
        setError("");
        console.log("Login erfolgreich:", data);        
      } else {
        setError(data.error);
      }      
    } catch (error) {
      console.error("Fehler beim Login:", error);
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    }    
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-Mail</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
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
          />
        </div>

        <button type="submit">Einloggen</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;