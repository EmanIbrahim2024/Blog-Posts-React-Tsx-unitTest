import { ValidationsignupProp } from "./Types";

export default function ValidationSignup({
  fullName,
  phone,
  email,
  password,
}: ValidationsignupProp): { isValid: boolean; message?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,15}$/;

  if (fullName.trim().length < 3) {
    return {
      isValid: false,
      message: "Full name must be at least 3 characters long",
    };
  }

  if (!phoneRegex.test(phone)) {
    return {
      isValid: false,
      message: "Phone number must be numeric and between 10 t0 15 digits",
    };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Please enter a valid email address." };
  }

  if (password.length < 6) {
    return {
      isValid: false,
      message: "Password must be at least 6 characters long..",
    };
  }

  return { isValid: true };
}
