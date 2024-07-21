import { LoaderCircle, Wine } from 'lucide-react';
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const CustomLoader = () => {
    return (
        <Flex
            height="60vh"
            alignItems="center"
            justifyContent="center"
            bg="gray.100"
        >
            <Box position="relative">
                <LoaderCircle size={100} strokeWidth={.5} className="animate-spin text-red-500" />
                <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                >
                    <Wine size={32} strokeWidth={1.5} className="text-red-500" />
                </Box>
            </Box>
        </Flex>
    );
};

export default CustomLoader;
