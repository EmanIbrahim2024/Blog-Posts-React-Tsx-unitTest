import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, Signup, Posts, NewPost, Dashboard ,EditPost } from "./pages/index";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ProtectedRoute,Layout } from "./Components";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "dashboard", element: <ProtectedRoute> <Dashboard/> </ProtectedRoute>},
      { path: "posts", element: <ProtectedRoute> <Posts /> </ProtectedRoute>  },
      { path: "new-post", element:<ProtectedRoute> <NewPost /> </ProtectedRoute>  },
      {path : "/edit/:id",element:<EditPost/>}
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
