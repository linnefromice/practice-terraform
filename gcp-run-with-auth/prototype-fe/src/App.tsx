import axios from "axios";
import { BE_URL } from "./config/backend";
import { useAuth, useAuthenticatedUser } from "./hooks/useAuth";

const generateAxiosInstance = (idToken?: string) => {
  const headers = idToken ? { Authorization: `Bearer ${idToken}` } : {};
  return axios.create({
    baseURL: BE_URL,
    headers,
  })
}

const App = () => {
  const { signIn, signOut } = useAuth();
  const { data: authenticated, isLoading: isLoadingAuthenticated } = useAuthenticatedUser();

  const callGET = async (input: { path: string, idToken?: string }) => {
    const { path , idToken } = input;
    const res = await generateAxiosInstance(idToken).get(path).catch(console.error);
    if (res) {
      console.log(res.data);
    }
  }

  // const callPOST = async (input: { path: string, idToken?: string, data?: any }) => {
  //   const { path , idToken, data } = input;
  //   const res = await generateAxiosInstance(idToken).post(path, data).catch(console.error);

  //   if (res) {
  //     console.log(res.data);
  //   }
  // }

  if (isLoadingAuthenticated) return <div>Loading...</div>

  return (
    <div style={{ width: "100%" }}>
      <h1>Firebase Authentication</h1>
      {authenticated && <p>Welcome, {authenticated.user.displayName ?? "Anonymous"}</p>}
      {authenticated && <p style={{
        color: "black",
        backgroundColor: "#f4f4f4",
        padding: "10px",
        whiteSpace: "pre",
        overflow: "auto",
      }}>{authenticated?.idToken}</p>}
      <button onClick={signIn}>LOGIN</button>
      {authenticated && <button onClick={signOut}>LOGOUT</button>}
      <button onClick={() => callGET({ path: "/", idToken: authenticated?.idToken })}>Call /</button>
      <button onClick={() => callGET({ path: "/users", idToken: authenticated?.idToken })}>Call /users with auth</button>
      <button onClick={() => callGET({ path: "/status", idToken: authenticated?.idToken })}>Call /status with auth</button>
    </div>
  )
}

export default App
