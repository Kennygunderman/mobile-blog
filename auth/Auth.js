import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

async function authUser() {
  if (auth().currentUser != null) {
    return auth().currentUser;
  } else {
    GoogleSignin.configure();
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential).user;
  }
}

const signOut = () => {
  auth().signOut();
};

export { authUser, signOut };
