import React, { useState } from "react";
import { SimpleGrid, Image, Text } from "@chakra-ui/core";

export default function PhotoWithCaption({ photos, caption }) {
  return (
    <>
      <SimpleGrid minChildWidth="120px" spacing="40px">
        {photos.map((photo) => (
          <Image key={photo.url} src={`${photo.url}?w=1000`} />
        ))}
      </SimpleGrid>
      <Text>{caption}</Text>
    </>
  );
}
