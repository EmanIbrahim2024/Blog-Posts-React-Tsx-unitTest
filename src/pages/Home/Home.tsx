import { Navigate } from "react-router-dom";

export default function Home() {
  const userInLocalSt = localStorage.getItem("user");
  const user = userInLocalSt ? JSON.parse(userInLocalSt) : null;
  //there is redirection component
  if (user) return <Navigate to="/dashboard" />;
  return <Navigate to="/login" />;
}
