import React from "react";
import {
  Box,
  Container,
  Flex,
  Stack,
  Text,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      bg="gray.100" // Background color
      color="gray.600" // Text color
      py={10}
      px={{ base: 4, md: 8 }}
      borderTopWidth={1}
      borderTopColor="gray.200" // Border color
      fontSize={{ base: "sm", md: "md" }}
    >
      <Box maxWidth={"90%"} mx={"auto"}>
        <Stack
          spacing={{ base: 8, md: 10 }}
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
        >
          {/* Navigation Links */}
          <Stack spacing={6} align={{ base: "center", md: "start" }}>
            <Text fontWeight="bold" fontSize="lg">Company</Text>
            <Stack spacing={4}>
              <Link
                href="#"
                _hover={{ color: "blue.500", textDecoration: "underline" }}
                transition="color 0.3s ease"
              >
                Home
              </Link>
              <Link
                href="#"
                _hover={{ color: "blue.500", textDecoration: "underline" }}
                transition="color 0.3s ease"
              >
                About
              </Link>
              <Link
                href="#"
                _hover={{ color: "blue.500", textDecoration: "underline" }}
                transition="color 0.3s ease"
              >
                Contact
              </Link>
            </Stack>
          </Stack>

          {/* Social Media Icons */}
          <Stack spacing={6} align={{ base: "center", md: "center" }}>
            <Text fontWeight="bold" fontSize="lg">Follow Us</Text>
            <Flex spacing={4}>
              <IconButton
                aria-label="Facebook"
                icon={<FaFacebookF />}
                variant="outline"
                colorScheme="blue"
                mx={1}
                _hover={{ bg: "blue.500", color: "white", transform: "scale(1.1)" }}
                transition="all 0.3s ease"
              />
              <IconButton
                aria-label="Twitter"
                icon={<FaTwitter />}
                variant="outline"
                colorScheme="blue"
                mx={1}
                _hover={{ bg: "blue.400", color: "white", transform: "scale(1.1)" }}
                transition="all 0.3s ease"
              />
              <IconButton
                aria-label="Instagram"
                icon={<FaInstagram />}
                variant="outline"
                colorScheme="pink"
                mx={1}
                _hover={{ bg: "pink.500", color: "white", transform: "scale(1.1)" }}
                transition="all 0.3s ease"
              />
              <IconButton
                aria-label="LinkedIn"
                icon={<FaLinkedinIn />}
                variant="outline"
                colorScheme="blue"
                mx={1}
                _hover={{ bg: "blue.700", color: "white", transform: "scale(1.1)" }}
                transition="all 0.3s ease"
              />
            </Flex>
          </Stack>

          {/* Contact Information */}
          <Stack spacing={6} align={{ base: "center", md: "end" }}>
            <Text fontWeight="bold" fontSize="lg">Contact Us</Text>
            <Stack spacing={2}>
              <Text>Email: contact@example.com</Text>
              <Text>Phone: (123) 456-7890</Text>
            </Stack>
          </Stack>
        </Stack>

        <Box mt={10} textAlign="center">
          <Text fontSize="sm">
            &copy; {new Date().getFullYear()} Company Name. All rights reserved.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
