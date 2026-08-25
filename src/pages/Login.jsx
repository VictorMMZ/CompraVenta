import "../../src/assets/css/login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        document.getElementById("error-message").innerHTML = "Credenciales incorrectas";
        return;
      }
      
      sessionStorage.setItem("user", JSON.stringify(data.user));
   
      console.log("Login correcto");

      navigate("/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };


  return (
    <main className="login-page" aria-labelledby="login-title">
      <section className="login-page" aria-labelledby="login-title">
        <img src="../src/assets/images/quickshop_logo.svg" alt="Logo de QuickShop" />
        <h1 id="login-title">Iniciar sesión</h1>
        <p>Ingresa tus datos para continuar</p>
         <div className="error-message" id="error-message"></div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="correo">Correo electrónico</label>
          <input
            id="correo"
            name="correo"
            type="email"
            placeholder="ejemplo@correo.com"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="contrasena">Contraseña</label>
          <input
            id="contrasena"
            name="contrasena"
            type="password"
            placeholder="Ingresa tu contraseña"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Iniciar sesión</button>
        </form>
      </section>
     
    </main>
  );
}

;
