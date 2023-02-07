import { appWithTranslation } from "next-i18next";
import "@/styles/globals.css";
import Login from "./_login";
import Loading from "@/components/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useEffect } from "react";
import firebase from "firebase/compat/app";

const App = ({ Component, pageProps }) => {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
        },
        {
          merge: true,
        }
      );
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />;
};

export default appWithTranslation(App);
