import { Header } from "./index";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Header />
      <main >
        <Outlet />
      </main>
    </>
  );
}
