import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { stateType, ProtectedRouteProp } from "./Types";

//that to ensure if there is no user redirect to login route
function ProtectedRoute({ children }: ProtectedRouteProp) {
  const user = useSelector((state: stateType) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
