import "./dashboard.css";
import UserPosts from "../Posts/UserPosts";

export default function Dashboard() {
  //get the user info from localstorage and display it
  const userInLocalSt = localStorage.getItem("user");
  const user = userInLocalSt ? JSON.parse(userInLocalSt) : null;

  return (
    <>
      <main>
        <section className="userInfo">
          <h1 className="welcomed" aria-labelledby="User Name">
            Welcome, <span className="Name" id="User Name"> {user.fullName} </span>{" "}
          </h1>

          <div>
            <p className="userMail" aria-labelledby="User email">Email: <span id="User email">{user.email}</span></p>
            <p className="userPass" aria-labelledby="User phone">Phone: <span id="User phone"> {user.phone} </span></p>
          </div>
        </section>
        <section>
          <UserPosts />
        </section>
      </main>
    </>
  );
}
