import { Container, ChatContainer } from "@/styles/chatPage.styles";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import ChatScreen from "@/components/ChatScreen";
import { db, auth } from "@/firebase";
import getRecepientEmail from "@/utils/getRecepientEmail.utility";
import { useAuthState } from "react-firebase-hooks/auth";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ChatPage = ({ chat, messages }) => {
  const [user] = useAuthState(auth);

  return (
    <Container>
      <Head>
        <title>Chat with {getRecepientEmail(chat.users, user)}</title>
      </Head>

      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);
  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  const chatRes = await ref.get();

  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      // ...(await serverSideTranslations(context.locale, [])),
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

export default ChatPage;
