import { useState } from "react";
import { login as loginFb, logout as logoutFb } from "./lib/auth"
import axios from "axios";
import { BE_URL } from "./config/backend";
import { User } from "firebase/auth";

const axiosInstance = axios.create({
  baseURL: BE_URL
})

const App = () => {
  const [user, setUser] = useState<User>();
  const [idToken, setIdToken] = useState<string>();

  const login = async () => {
    const res = await loginFb();
    if (res && res.user) {
      setUser(res.user);
      setIdToken(await res.user.getIdToken());
    }
  }

  const logout = async () => {
    await logoutFb();
    setUser(undefined);
  }

  const callGET = async (path: string) => {
    const res = await axiosInstance.get(path).catch(console.error);
    if (res) {
      console.log(res.data);
    }
  }

  const callPOST = async (path: string, idToken: string) => {
    const res = await axiosInstance.post(path, {
      idToken: idToken
    }).catch(console.error);

    if (res) {
      console.log(res.data);
    }
  }

  return (
    <div>
      <h1>Firebase Authentication</h1>
      {user && <p>Welcome, {user.displayName ?? "Anonymous"}</p>}
      <button onClick={login}>LOGIN</button>
      {user && <button onClick={logout}>LOGOUT</button>}
      <button onClick={() => callGET("/")}>Call /</button>
      <button onClick={() => callGET("/app/js")}>Call /app/js</button>
      <button onClick={() => callGET("/app/ts")}>Call /app/ts</button>
      <button onClick={() => callPOST("/auth", idToken as string)}>Call /auth</button>
      <button onClick={() => callGET("/no-auth")}>Call /no-auth</button>
    </div>
  )
}

export default App
