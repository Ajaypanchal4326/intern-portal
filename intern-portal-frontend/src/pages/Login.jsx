import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backImg from "../assets/back.webp";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ name: "", age: "", email: "", phone: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "age" && value < 0) return;

    if (name === "phone" && (!/^\d*$/.test(value) || value.length > 10)) return;

    setForm({ ...form, [name]: value });
  };

  const handleLogin = () => {
    const ageNum = Number(form.age);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[1-9]\d{9}$/;

    if (!form.name || !form.age || !form.email || !form.phone) {
      alert("Please fill all fields!");
      return;
    }

    if (isNaN(ageNum) || ageNum <= 0) {
      alert("Age must be a positive number!");
      return;
    }

    if (!emailPattern.test(form.email)) {
      alert("Please enter a valid email address!");
      return;
    }

    if (!phonePattern.test(form.phone)) {
      alert("Phone number must be 10 digits and not start with 0!");
      return;
    }

    localStorage.setItem("userData", JSON.stringify(form));
    navigate("/dashboard");
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${backImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="login-container">
        <h1>Intern Portal</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          min="1"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          pattern="[1-9]{1}[0-9]{9}"
          maxLength="10"
          onChange={handleChange}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
