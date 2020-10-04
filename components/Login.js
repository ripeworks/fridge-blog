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
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/core";
import Container from "../components/Container";
import Cookies from "universal-cookie";

const Login = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const cookies = new Cookies();
      cookies.set("fridge_blog_password", password, {
        path: "/",
      });

      try {
        setError(false);
        const res = await fetch("/api/auth");
        const { hasAccess } = await res.json();
        setError(!hasAccess);
        if (hasAccess) {
          window.location.href = router.asPath ?? "/";
        }
      } catch (err) {
        setError(true);
      }
    },
    [password]
  );

  const onTogglePassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

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
          <FormControl isInvalid={error}>
            <FormLabel htmlFor="password">Speak Friend and Enter</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "test" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={onTogglePassword}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>Incorrect Password</FormErrorMessage>
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
