import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { stateType, ProtectedRouteProp } from "./Types";

function ProtectedRoute({ children }: ProtectedRouteProp) {
  const user = useSelector((state: stateType) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
