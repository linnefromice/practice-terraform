import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

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

export const login = async () => {
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

export const logout = async () => {
  const { auth } = initializeAuth();
  auth.signOut().then(() => {
    console.log("logged out");
  }).catch((error) => {
    console.error(error);
  })
}