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

  const callPOST = async (input: { path: string, idToken?: string, data?: any }) => {
    const { path , idToken, data } = input;
    const res = await generateAxiosInstance(idToken).post(path, data).catch(console.error);

    if (res) {
      console.log(res.data);
    }
  }

  if (isLoadingAuthenticated) return <div>Loading...</div>

  return (
    <div>
      <h1>Firebase Authentication</h1>
      {authenticated && <p>Welcome, {authenticated.user.displayName ?? "Anonymous"}</p>}
      <button onClick={signIn}>LOGIN</button>
      {authenticated && <button onClick={signOut}>LOGOUT</button>}
      <button onClick={() => callGET({ path: "/", idToken: authenticated?.idToken })}>Call /</button>
      <button onClick={() => callGET({ path: "/app/js", idToken: authenticated?.idToken })}>Call /app/js</button>
      <button onClick={() => callGET({ path: "/app/ts", idToken: authenticated?.idToken })}>Call /app/ts</button>
      <button onClick={() => callGET({ path: "/auth", idToken: authenticated?.idToken })}>Call /auth</button>
      <button onClick={() => callGET({ path: "/no-auth", idToken: authenticated?.idToken })}>Call /no-auth</button>
    </div>
  )
}

export default App
