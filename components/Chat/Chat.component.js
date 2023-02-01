import { useRouter } from "next/router";
import { Container, UserAvatar } from "./Chat.styles";
import getRecepientEmail from "@/utils/getRecepientEmail.utility";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "@/firebase";

const Chat = ({ id, users }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recepientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecepientEmail(users, user))
  );

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  const recepient = recepientSnapshot?.docs[0]?.data();
  const recepientEmail = getRecepientEmail(users, user);

  return (
    <Container onClick={enterChat}>
      {recepient ? (
        <UserAvatar src={recepient?.photoURL} />
      ) : (
        <UserAvatar>{recepientEmail[0]}</UserAvatar>
      )}

      <p>{recepientEmail}</p>
    </Container>
  );
};

export default Chat;
