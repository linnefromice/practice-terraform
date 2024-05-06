import { useState } from "react";
import { login as loginFb, logout as logoutFb } from "./lib/auth"

const App = () => {
  const [name, setName] = useState<string>();

  const login = async () => {
    const user = await loginFb();
    if (user) {
      setName(user.name || "Anonymous");
    }
  }

  const logout = async () => {
    await logoutFb();
    setName(undefined);
  }

  return (
    <div>
      <h1>Firebase Authentication</h1>
      {name && <p>Welcome, {name}</p>}
      <button onClick={login}>LOGIN</button>
      {name && <button onClick={logout}>LOGOUT</button>}
    </div>
  )
}

export default App
