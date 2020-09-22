import React from "react";
import Text from "../blocks/Text";
import PhotoGallery from "../blocks/PhotoGallery";
import PhotoWithCaption from "../blocks/PhotoWithCaption";
import { Box, Stack } from "@chakra-ui/core";

const Block = (props) => {
  return <Box {...props} />;
};
export default function BlockContent({ blocks }) {
  return (
    <Stack spacing={8}>
      {blocks.map((block) => {
        switch (block.type) {
          case "text":
            return (
              <Block key={block.id}>
                <Text content={block.body} />
              </Block>
            );
          case "photo_gallery":
            return (
              <Block key={block.id}>
                <PhotoGallery photos={block.photos || []} />
              </Block>
            );
          case "photo_with_caption":
            return (
              <Block key={block.id}>
                <PhotoWithCaption
                  photos={block.photos || []}
                  caption={block.caption}
                />
              </Block>
            );
          default:
            console.warn(`No renderer for block: ${block.type}`, block);
            return null;
        }
      })}
    </Stack>
  );
}
