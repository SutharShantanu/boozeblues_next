"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  Flex,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { CircleArrowUp, Loader, MoveRight } from "lucide-react";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/slices/userSlice";
import { useSession, signIn, signOut } from "next-auth/react"

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { data: session } = useSession()
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();

  const onBlur = (fieldName) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
      emailError:
        name === "email" && !isValidEmail(value)
          ? "Invalid email address"
          : undefined,
    }));
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // const response = await axios.post("/api/users/login", values);
      const signInData = await signIn('credentials', filteredValues);
      console.log(signInData);
      if (response.status === 200) {
        // const data = response.data;
        // console.log(data);

        // localStorage.setItem("token", token);

        setIsLoading(false);
        toast({
          title: "Login Successful",
          description: "Welcome back!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });

        router.push("/");
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Login Failed",
        description: error.response?.data || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <Flex align="center" justify="center" minH="100vh" bg="gray.50" >
      <Box bg="white" p={8} borderRadius="lg" boxShadow="lg" w="full" maxW="lg">
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">Login to Boozeblues</Heading>
            <Text fontSize="md" color="gray.600">
              Buy a variety of liquor online ✌️
            </Text>
          </Stack>
          <form onSubmit={onSubmit}>
            <Stack spacing={4}>
              <FormControl
                id="email"
                isRequired
                isInvalid={touched.email && !!values.emailError}
              >
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  errorBorderColor="red.300"
                  placeholder="markspector@email.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={() => onBlur("email")}
                />
                <FormErrorMessage>{values.emailError}</FormErrorMessage>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    name="password"
                    errorBorderColor="red.300"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={() => onBlur("password")}
                  />
                  <InputRightElement>
                    <IconButton
                      variant={"ghost"}
                      borderWidth={2}
                      p={0}
                      size={"sm"}
                      rounded={"full"}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </IconButton>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                type="submit"
                bg="gray.900"
                color="gray.50"
                _hover={{ bg: "gray.800" }}
                isLoading={isLoading}
                loadingText="Logging in"
                isDisabled={!values.email || !values.password}
              >
                {isLoading ? (
                  <Loader size={16} strokeWidth={1.2} />
                ) : (
                  <Flex alignItems="start">
                    Login
                    <MoveRight
                      size={20}
                      strokeWidth={3}
                      className="transition-all duration-300 ease-in-out w-0 group-hover:w-10"
                    />
                  </Flex>
                )}
              </Button>
            </Stack>
            <Flex pt={4} mx="auto" justify="center">
              <Text as="span" display="flex" alignItems="center">
                New user?
                <Link
                  href="/signup"
                  className="flex items-center text-blue-600 group mx-1 border-b border-transparent hover:border-blue-600 transition-all ease-in-out"
                >
                  <span className="mr-1">Sign up</span>
                  <CircleArrowUp
                    size={16}
                    strokeWidth={1.2}
                    className="rotate-45 group-hover:rotate-90 transition-all ease-in-out"
                  />
                </Link>
              </Text>
            </Flex>
          </form>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Login;
