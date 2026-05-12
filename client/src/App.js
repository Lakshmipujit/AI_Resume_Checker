import React, { useState } from "react";

import Login from "./Login";
import Register from "./Register";
import UploadResume from "./UploadResume";

function App() {

  const token = localStorage.getItem("token");

  const [showRegister, setShowRegister] = useState(false);

  if (token) {
    return <UploadResume />;
  }

  return (

    <div>

      {showRegister ? (

        <Register setShowRegister={setShowRegister} />

      ) : (

        <Login setShowRegister={setShowRegister} />

      )}

    </div>
  );
}

export default App;