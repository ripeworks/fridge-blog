import React, { useState } from "react";
import {
  Box,
  Flex,
  Link,
  SimpleGrid,
  Image,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  Spinner,
} from "@chakra-ui/core";

export default function PhotoGallery({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(-1);
  const [loading, setLoading] = useState(false);

  const gotoPhoto = (index) => {
    setSelectedPhoto(index);
    setLoading(true);
  };

  return (
    <SimpleGrid minChildWidth="120px" spacing="40px">
      {photos.map((photo, index) => (
        <Link
          key={photo.url}
          onClick={() => gotoPhoto(index)}
          _hover={{ textDecoration: "none" }}
        >
          <Image src={`${photo.url}?w=400`} />
        </Link>
      ))}
      <Modal
        onClose={() => setSelectedPhoto(-1)}
        isOpen={selectedPhoto > -1}
        size="90%"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex my={4} align="center" justify="center" position="relative">
              {loading && (
                <Box position="absolute">
                  <Spinner emptyColor="white" />
                </Box>
              )}
              <Image
                margin="0 auto"
                onLoad={() => setLoading(false)}
                src={photos[selectedPhoto]?.url}
              />
              <a
                onClick={() => {
                  const nextPhoto =
                    selectedPhoto === 0 ? photos.length - 1 : selectedPhoto - 1;
                  gotoPhoto(nextPhoto);
                }}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "50%",
                }}
              />
              <a
                onClick={() => {
                  const nextPhoto =
                    selectedPhoto === photos.length - 1 ? 0 : selectedPhoto + 1;
                  gotoPhoto(nextPhoto);
                }}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: "50%",
                }}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </SimpleGrid>
  );
}
