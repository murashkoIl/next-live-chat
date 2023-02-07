import React from "react";
import {
  Container,
  Header,
  UserAvatar,
  IconsContainer,
  Search,
  SearchInput,
  SidebarButton,
} from "./Sidebar.styles";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import Chat from "../Chat";
import SwapLanguages from "../SwapLanguages";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "@/firebase";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [chatsSnapshot] = useCollection(
    db.collection("chats").where("users", "array-contains", user.email)
  );

  const createChat = () => {
    const input = prompt("Enter am email address");

    if (!input) return null;
    if (
      EmailValidator.validate(input) &&
      !chatAreadyExists(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAreadyExists = (email) =>
    !!chatsSnapshot?.docs.find(
      (chat) => chat.data().users.find((user) => user === email)?.length > 0
    );

  const signOut = () => {
    auth.signOut();
  };

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={signOut} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>
      <SidebarButton onClick={createChat}>Start a new Chat</SidebarButton>

      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}

      <SwapLanguages />
    </Container>
  );
};

export default Sidebar;
