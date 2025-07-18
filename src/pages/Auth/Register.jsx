import { useState } from "react";
import { registerUser } from "../../api/auth";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in form) {
      if (form[key]) data.append(key, form[key]);
    }
    await registerUser(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Full Name" onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, avatar: e.target.files[0] })} />
      <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, coverImage: e.target.files[0] })} />
      <button type="submit">Register</button>
    </form>
  );
}
