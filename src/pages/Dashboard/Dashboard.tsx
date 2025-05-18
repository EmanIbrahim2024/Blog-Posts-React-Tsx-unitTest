import "./dashboard.css";
import UserPosts from "../Posts/UserPosts";

export default function Dashboard() {
  //get the user info from localstorage and display it
  const userInLocalSt = localStorage.getItem("user");
  const user = userInLocalSt ? JSON.parse(userInLocalSt) : null;

  return (
    <>
      <div className="userInfo">
        <h2 className="welcomed">
          Welcome, <span className="Name"> {user.fullName} </span>{" "}
        </h2>

        <div>
          <p className="userMail">Email: {user.email}</p>
          <p className="userPass">Phone: {user.phone}</p>
        </div>
      </div>
      <UserPosts />
    </>
  );
}
