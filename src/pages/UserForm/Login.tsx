import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/AuthSliceAndtest/authSlice";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./UserForm.css";
import { ref, get } from "firebase/database";
import { realTimeDataBase } from "../../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const snapshot = await get(ref(realTimeDataBase, "users/" + user.uid));
      const userData = snapshot.val();
      dispatch(loginSuccess(userData));
      navigate("/dashboard");
    } catch (error: any) {
      alert("Error: " + error.code);
    }
  };

  return (
    <div>
      <h1 className="pagetitle">Login</h1>
      <form onSubmit={handleLogin} className="Log-sign-form">
        <label htmlFor="email"> Email </label>
        <input
          id="email"
          type="email"
          placeholder="eman@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="12T*jP"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
