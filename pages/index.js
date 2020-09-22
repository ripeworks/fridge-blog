import { fridge } from "fridge-next";
import NextLink from "next/link";
import Head from "next/head";
import { Stack, Box, Flex, Link, Heading, Text } from "@chakra-ui/core";
import dateformat from "dateformat";
import Container from "../components/Container";

const Index = ({ posts }) => {
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
        {posts.map((post) => (
          <NextLink key={post.id} href={`/posts/${post.slug}`} passHref>
            <Link mb={8} w="100%" _hover={{ textDecoration: "none" }}>
              <Box display="block" width="100%">
                <Flex
                  align="flex-start"
                  justifyContent="space-between"
                  flexDirection={["column", "row"]}
                >
                  <Heading size="md" as="h3" fontWeight="medium">
                    {post.title}
                  </Heading>
                  <Text
                    color="gray.500"
                    minWidth="105px"
                    textAlign={["left", "right"]}
                    mb={[4, 0]}
                  >
                    {dateformat(post.createdat, "longDate")}
                  </Text>
                </Flex>
              </Box>
            </Link>
          </NextLink>
        ))}
      </Stack>
    </Container>
  );
};

export default Index;

export async function getStaticProps() {
  const posts = await fridge("content/blog_post");

  return {
    props: { posts },
  };
}
