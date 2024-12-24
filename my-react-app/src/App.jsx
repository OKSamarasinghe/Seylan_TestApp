import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDetailForm from "./components/UserDetailForm";
import UserTable from "./components/UserTable";
import UpdateUser from "./components/UpdateUser";
import ViewUser from "./components/ViewUser";

const App = () => {
  const [data, setData] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserDetailForm/>} />
        <Route path="/table" element={<UserTable/>} />
        <Route path="/update/:id" element={<UpdateUser users={data} setUsers={setData} />} />
        <Route path="/view/:id" element={<ViewUser users={data} />} />
      </Routes>
    </Router>
  );
};

export default App;
