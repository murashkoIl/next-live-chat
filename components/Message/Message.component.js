import React from "react";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Reciever, Sender, Timestamp } from "./Message.styles";
import moment from "moment";

const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth);
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

  return (
    <TypeOfMessage>
      {message.message}{" "}
      <Timestamp>
        {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
      </Timestamp>
    </TypeOfMessage>
  );
};

export default Message;
