import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Navbartop from "./components/Navbartop";
import Employees from "./pages/Employees";
import Vouchers from "./pages/Vouchers";
import Customers from "./pages/Customers";
import AttendancePage from "./pages/AttendancePage";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Navbartop />
        <Routes>
          <Route
            index
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/employees"
            element={user ? <Employees /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/customers"
            element={user ? <Customers /> : <Navigate to="/login" />}
          />
          <Route
            path="/vouchers"
            element={user ? <Vouchers /> : <Navigate to="/login" />}
          />
          <Route
            path="/attendance"
            element={user ? <AttendancePage /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
