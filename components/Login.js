import { useCallback, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Stack,
  Button,
  Box,
  Flex,
  Link,
  Heading,
  Text,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/core";
import Container from "../components/Container";
import Cookies from "universal-cookie";

const Login = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const cookies = new Cookies();
      cookies.set("fridge_blog_password", password, {
        path: "/",
      });
      window.location.href = router.asPath ?? "/";
    },
    [password]
  );

  return (
    <Container>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE || "Blog"}</title>
      </Head>
      <Stack
        as="main"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        width="700px"
        maxWidth="100%"
      >
        <form onSubmit={onSubmit}>
          <FormControl>
            <FormLabel htmlFor="password">Speak Friend and Enter</FormLabel>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button mt={4} type="submit">
            Submit
          </Button>
        </form>
      </Stack>
    </Container>
  );
};

export default Login;
