import React from "react";
import {
  Container,
  LoginContainer,
  Logo,
  Title,
  SubLogo,
} from "@/styles/login.styles";
import Head from "next/head";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="https://www.svgrepo.com/show/65411/chat.svg" alt="chat" />
        <Title>Live Chat</Title>
        <Button onClick={signIn} variant="outlined">
          Sign In with Google{" "}
          <SubLogo
            src="https://freesvg.org/img/1534129544.png"
            alt="Google icon"
          />
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default Login;
