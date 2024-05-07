import { useState } from "react";
import { login as loginFb, logout as logoutFb } from "./lib/auth"
import axios from "axios";
import { BE_URL } from "./config/backend";

const axiosInstance = axios.create({
  baseURL: BE_URL
})

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

  const callGET = async (path: string) => {
    const res = await axiosInstance.get(path).catch(console.error);
    if (res) {
      console.log(res.data);
    }
  }

  return (
    <div>
      <h1>Firebase Authentication</h1>
      {name && <p>Welcome, {name}</p>}
      <button onClick={login}>LOGIN</button>
      {name && <button onClick={logout}>LOGOUT</button>}
      <button onClick={() => callGET("/")}>Call /</button>
      <button onClick={() => callGET("/app/js")}>Call /app/js</button>
      <button onClick={() => callGET("/app/ts")}>Call /app/ts</button>
    </div>
  )
}

export default App
