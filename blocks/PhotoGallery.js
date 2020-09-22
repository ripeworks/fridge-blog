import React, { useState } from "react";
import {
  Link,
  SimpleGrid,
  Image,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalBody,
} from "@chakra-ui/core";

export default function PhotoGallery({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState("");

  return (
    <SimpleGrid minChildWidth="120px" spacing="40px">
      {photos.map((photo) => (
        <Link
          key={photo.url}
          onClick={() => setSelectedPhoto(`${photo.url}?w=2000`)}
          _hover={{ textDecoration: "none" }}
        >
          <Image src={`${photo.url}?w=500`} />
        </Link>
      ))}
      <Modal
        onClose={() => setSelectedPhoto("")}
        isOpen={!!selectedPhoto}
        size="90%"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Image margin="0 auto" src={selectedPhoto} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </SimpleGrid>
  );
}
