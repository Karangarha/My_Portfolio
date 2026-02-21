import Homepage from "./pages/Homepage";
import NavIcon from "./components/NavIcon";
import MouseMotion from "./components/mouseMotion";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
  ]);
  return (
    <ThemeProvider>
      <NavIcon />
      <MouseMotion />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
