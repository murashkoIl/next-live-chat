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
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Login = () => {
  const { t, ready } = useTranslation();
  const { locale } = useRouter(); 

  console.log(ready, locale);

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
      {t("start")}
    </Container>
  );
};

export default Login;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [])),
    },
  };
}
