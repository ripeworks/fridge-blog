import React from "react";
import { Flex, Text } from "@chakra-ui/core";
import styled from "@emotion/styled";
import Link from "next/link";

const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: background-color 0.1 ease-in-out;
`;

const Container = ({ children }) => {
  return (
    <>
      <StickyNav
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        maxWidth="900px"
        width="100%"
        as="nav"
        p={8}
        mt={[0, 8]}
        mb={8}
        mx="auto"
      >
        <Link href="/">
          <a>
            <Text>{process.env.NEXT_PUBLIC_TITLE || "Blog"}</Text>
          </a>
        </Link>
      </StickyNav>
      <Flex as="main" justifyContent="center" flexDirection="column" px={8}>
        {children}
      </Flex>
    </>
  );
};

export default Container;
