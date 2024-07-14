"use client";

import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { CircleArrowUp } from "lucide-react";

const NotFound = () => {
  return (
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        py={10}
        px={6}
        borderWidth={2}
        height="91vh"
        borderColor="red"
      >
        <Box py={10} justifyContent="center" px={6}>
          <Box display="inline-block">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bg="red.500"
              rounded="50px"
              w="55px"
              h="55px"
              textAlign="center"
            >
              <CloseIcon boxSize="20px" color="white" />
            </Flex>
          </Box>
          <Heading
            as="h2"
            size="xl"
            my={6}
            p={2}
            bgGradient="linear(to-l, #BF360C, #FF5722, #FFAB91, )"
            bgClip="text"
          >
            Page Not Found / Error 404
          </Heading>
          <Box width="fit-content" mx="auto" mb={4}>
            <Text color="gray.500" mb={2}>
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It
              might have been removed, had its name changed, or is temporarily
              unavailable.
            </Text>
            <Text color="gray.500" mb={2}>
              Please check the URL for errors or try searching for what you
              need. If you still need help, feel free to contact our support
              team.
            </Text>
            <Text color="gray.500" mb={4}>
              You can also go back to the homepage by clicking the button below.
            </Text>
          </Box>
          <Box width={"fit-content"} marginX={"auto"}>
            <Link
              className="flex items-center justify-between border-b pb-1 px-2 text-gray-500 mx-2 group hover:border-gray-500 transition-all ease-in-out"
              href="/"
            >
              <span className="mr-2">Return to Homepage</span>
              <CircleArrowUp
                size={16}
                strokeWidth={1.2}
                absoluteStrokeWidth
                className="rotate-45 group-hover:rotate-90 group-hover:translate-x-1 transition-all ease-in-out"
              />
            </Link>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default NotFound;
