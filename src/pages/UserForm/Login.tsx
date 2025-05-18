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

  const handleLogin = async (e:FormEvent) => {
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
    } catch (error:any) {
      alert("Error: " + error.code);
    }
  };

  return (
    <div>
      <h2 className="pagetitle">Login</h2>
      <form onSubmit={handleLogin} className="Log-sign-form">
        <label> Email </label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
