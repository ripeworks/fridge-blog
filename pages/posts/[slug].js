import { fridge, HtmlContent } from "fridge-next";
import React from "react";
import Container from "../../components/Container";
import { Stack, Flex, Heading, Text, Spinner } from "@chakra-ui/core";
import dateformat from "dateformat";
import BlockContent from "../../components/BlockContent";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Post({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Container>
        <Flex justifyContent="center" m="0 auto 4rem auto">
          <Spinner />
        </Flex>
      </Container>
    );
  }

  return (
    <Container>
      <Head>
        <title>
          {post.title} - {process.env.NEXT_PUBLIC_TITLE || "Blog"}
        </title>
      </Head>
      <Stack
        as="article"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="700px"
        w="100%"
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
          w="100%"
        >
          <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
            {post.title}
          </Heading>
          <Flex
            justify="space-between"
            align={["initial", "center"]}
            direction={["column", "row"]}
            mt={2}
            w="100%"
            mb={4}
          >
            <Flex align="center">
              <Text fontSize="sm">
                {dateformat(post.createdAt, "longDate")}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <BlockContent blocks={post.body || []} />
      </Stack>
    </Container>
  );
}

export async function getStaticProps({ params }) {
  const post = await fridge(`content/blog_post/${params.slug}`);

  return {
    props: { post },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const posts = await fridge(`content/blog_post`);

  return {
    paths: posts ? posts.map((post) => `/posts/${post.slug}`) : [],
    fallback: true,
  };
}
