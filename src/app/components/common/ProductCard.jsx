import React from "react";
import {
    Box,
    Image,
    Stack,
    Text,
    IconButton,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
} from "@chakra-ui/react";
import { FaHeart, FaCartPlus, FaEllipsisH } from "react-icons/fa";

const ProductCard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box
            borderWidth={1}
            borderRadius="md"
            overflow="hidden"
            position="relative"
            bg="white"
            shadow="lg"
            _hover={{ shadow: "2xl", transform: "scale(1.02)" }}
            transition="all 0.3s ease"
            maxW="sm"
            mx="auto"
        >
            {/* Heart Icon Button */}
            <IconButton
                aria-label="Add to Wishlist"
                icon={<FaHeart />}
                position="absolute"
                top={4}
                right={4}
                variant="outline"
                colorScheme="red"
                borderRadius="full"
                _hover={{ bg: "red.100", color: "red.500", transform: "scale(1.1)" }}
                transition="all 0.3s ease"
                size="lg"
            />

            {/* Product Image */}
            <Image
                src="https://via.placeholder.com/300"
                alt="Product Image"
                width="100%"
                height={{ base: "200px", md: "250px" }}
                objectFit="cover"
            />

            {/* Card Content */}
            <Box p={4}>
                <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
                    Product Name
                </Text>
                <Text color="gray.600" mt={2} fontSize={{ base: "sm", md: "md" }}>
                    $29.99
                </Text>

                {/* Buttons */}
                <Stack direction={{ base: "column", md: "row" }} spacing={4} mt={4} align="center">
                    <Button
                        colorScheme="teal"
                        variant="solid"
                        leftIcon={<FaCartPlus />}
                        onClick={() => console.log("Added to Cart")}
                        width="full"
                        _hover={{ bg: "teal.600", transform: "scale(1.05)" }}
                        transition="all 0.3s ease"
                    >
                        Add to Cart
                    </Button>
                    <Button
                        colorScheme="blue"
                        variant="outline"
                        rightIcon={<FaEllipsisH />}
                        onClick={onOpen}
                        width="full"
                        _hover={{ bg: "blue.100", color: "blue.600", transform: "scale(1.05)" }}
                        transition="all 0.3s ease"
                    >
                        View More
                    </Button>
                </Stack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Product Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Add product details here */}
                        <Text>This is a more detailed description of the product.</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProductCard;
