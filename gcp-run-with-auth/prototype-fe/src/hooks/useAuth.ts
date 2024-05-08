import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import useSWR from "swr";

const initializeAuth = () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
  const auth = getAuth();
  auth.languageCode = "en";

  return {
    auth,
    provider
  }
}

export const useAuth = () => {
  const signIn = () => {
    const { auth, provider } = initializeAuth();

    return signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential === null) return;
      const token = credential.accessToken;
      return {
        user: result.user,
        token: token
      }
    }).catch((error) => {
      console.error(error);
      return null;
    })
  }

  const signOut = () => {
    const { auth } = initializeAuth();
    auth.signOut().then(() => {
      console.log("logged out");
    }).catch((error) => {
      console.error(error);
    })
  }

  return { signIn, signOut }
}

export const useAuthenticatedUser = () => {
  const { auth } = initializeAuth();
  const { data, isLoading } = useSWR("firebaseUser", async () => {
    const user = auth.currentUser;
    if (user === null) return null;
    const idToken = await user.getIdToken();
    return {
      user,
      idToken
    }
  })
  return { data, isLoading }
}
