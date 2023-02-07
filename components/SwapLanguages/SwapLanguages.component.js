import { useRouter } from "next/router";
import { Button } from "@material-ui/core";
import { Container } from "./SwapLanguages.styles";

const SwapLanguages = () => {
  const { locales, push } = useRouter();

  const handleClick = (locale) => {
    push("/", undefined, { locale });
  };

  return (
    <Container>
      {locales.map((locale) => (
        <Button
          variant="outlined"
          key={locale}
          onClick={() => handleClick(locale)}
        >
          {locale}
        </Button>
      ))}
    </Container>
  );
};

export default SwapLanguages;
