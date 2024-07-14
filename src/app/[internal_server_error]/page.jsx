"use client";

import { WarningTwoIcon } from "@chakra-ui/icons";
import { Box, Heading, Text } from "@chakra-ui/react";
import { RotateCw } from "lucide-react";
import Link from "next/link";
import React from "react";

const InternalServerError = () => {
  const reloadPage = () => {
    window.location.reload();
  };

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
            <WarningTwoIcon boxSize="50px" color="orange.300" />
          </Box>
          <Heading
            as="h2"
            size="xl"
            my={6}
            p={2}
            bgGradient="linear(to-l, #BF360C, #FF5722, #FFAB91)"
            bgClip="text"
          >
            Internal Server Error
          </Heading>
          <Box width="fit-content" mx="auto" mb={4}>
            <Text color="gray.500" mb={2}>
              Oops! Something went wrong on our end.
            </Text>
            <Text color="gray.500" mb={2}>
              Please try refreshing the page. If the problem persists, contact
              our support team.
            </Text>
            <Text color="gray.500" mb={4}>
              You can also try returning to the homepage or reloading the page.
            </Text>
          </Box>
          <Box width={"fit-content"} marginX={"auto"}>
            <Link
              className="flex items-center justify-between border-b pb-1 px-2 text-gray-500 mx-2 group hover:border-gray-500 transition-all ease-in-out"
              href={"#"}
              onClick={(e) => {
                e.preventDefault();
                reloadPage();
              }}
            >
              <span className="mr-2">Reload Page</span>
              <RotateCw
                size={16}
                strokeWidth={1.2}
                absoluteStrokeWidth
                className=" group-hover:rotate-[180deg] transition-all ease-in-out"
              />
            </Link>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default InternalServerError;
