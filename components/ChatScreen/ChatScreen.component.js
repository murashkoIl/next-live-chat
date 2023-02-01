import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Header,
  HeaderInformation,
  HeaderIcons,
  MessageContainer,
  EndOfMessage,
  InputContainer,
  Input,
} from "./ChatScreen.styles";
import Message from "@/components/Message";
import { auth } from "@/firebase";
import { Avatar, IconButton } from "@material-ui/core";
import { useCollection } from "react-firebase-hooks/firestore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MicIcon from "@material-ui/icons/Mic";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { db } from "@/firebase";
import firebase from "firebase/compat/app";
import { InsertEmoticon } from "@material-ui/icons";
import getRecepientEmail from "@/utils/getRecepientEmail.utility";
import TimeAgo from "timeago-react";

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const endOfMessagesRef = useRef(null);
  const recepientEmail = getRecepientEmail(chat.users, user);
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );
  const [recepientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecepientEmail(chat.users, user))
  );
  const recepient = recepientSnapshot?.docs?.[0]?.data();

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data()?.timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: search,
      user: user.email,
      photoURL: user.photoURL,
    });

    setSearch("");
    scrollToBottom();
  };

  return (
    <Container>
      <Header>
        {recepient ? (
          <Avatar src={recepient?.photoURL} />
        ) : (
          <Avatar>{recepientEmail[0]}</Avatar>
        )}
        <HeaderInformation>
          <h3>{recepientEmail}</h3>
          {recepientSnapshot ? (
            <p>
              Last active:{" "}
              {recepient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recepient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading</p>
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessagesRef} />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticon />
        <Input value={search} onChange={handleSearch} />
        <button hidden disabled={!search} type="submit" onClick={sendMessage}>
          Send Message
        </button>
        <MicIcon />
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;
