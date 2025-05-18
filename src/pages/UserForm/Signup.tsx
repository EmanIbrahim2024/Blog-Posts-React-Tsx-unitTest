import { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, realTimeDataBase } from "../../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/AuthSliceAndtest/authSlice";
import { useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";
import { ValidationSignup } from "../../Components/index";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = ValidationSignup({ fullName, phone, email, password });

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm.isValid) {
      alert(validateForm.message);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      const userData = { uid, email, fullName, phone, createdAt: new Date() };

      await set(ref(realTimeDataBase, `users/${uid}`), userData);

      dispatch(loginSuccess(userData));
      navigate("/dashboard");
    } catch (error: any) {
      alert("Error: " + error.code);
    }
  };

  return (
    <div>
      <h2 className="pagetitle">Sign Up</h2>
      <form onSubmit={handleSignup} className="Log-sign-form">
        <label htmlFor="name">Full Name </label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="phone">Phone Number </label>
        <input
          id="phone"
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
