"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { CheckCircleIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { CircleArrowUp, Loader, MoveRight } from "lucide-react";
import { useToast } from "@chakra-ui/react";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  terms: false,
  ageConfirmation: false,
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const onBlur = (fieldName) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    if (fieldName === "password" || fieldName === "confirmPassword") {
      setValues((prev) => ({
        ...prev,
        passwordError:
          fieldName === "password" && !isValidPassword(values.password)
            ? "Password must be at least 6 characters including one symbol and one number"
            : undefined,
      }));
      setPasswordMatch(
        isValidPassword(values.password) &&
        (fieldName === "password"
          ? values.password === values.confirmPassword
          : values.password === values.confirmPassword)
      );
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      emailError:
        name === "email" && !isValidEmail(value)
          ? "Invalid email address"
          : undefined,
      passwordError:
        name === "password" && !isValidPassword(value)
          ? "Password must be at least 6 characters including one symbol and one number"
          : undefined,
    }));

    if (name === "password" || name === "confirmPassword") {
      setPasswordMatch(
        isValidPassword(values.password) &&
        (name === "password"
          ? value === values.confirmPassword
          : values.password === value)
      );
    }
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidPassword = (password) => {
    const regex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=])[a-zA-Z0-9!@#$%^&*()_\-+=]{6,}$/;
    return regex.test(password);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(values);

    const { emailError, passwordError, ...filteredValues } = values;

    try {
      const response = await axios.post("/api/users/signup", filteredValues);
      setIsLoading(false);
      setValues(initialValues);
      if (response.status === 200) {
        toast({
          title: "Account Successfully Created",
          description: "Your account has been successfully created. Welcome aboard!",
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
        title: "Account Creation Failed",
        description: error.response?.data || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      console.log(`Error from catch: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box bg="white" p={8} borderRadius="lg" boxShadow="lg" w="full" maxW="lg">
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">Sign up at Boozeblues</Heading>
            <Text fontSize="md" color="gray.600">
              Buy variety of liquar online ✌️
            </Text>
          </Stack>
          <form onSubmit={onSubmit}>
            <Stack spacing={4}>
              <SimpleGrid columns={2} spacing={4}>
                <FormControl
                  id="fullName"
                  isRequired
                  isInvalid={touched.fullName && !values.fullName}
                >
                  <FormLabel htmlFor="fullName">Full Name</FormLabel>
                  <Input
                    id="fullName"
                    name="fullName"
                    errorBorderColor="red.300"
                    placeholder="Mark Spector"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={() => onBlur("fullName")}
                  />
                  <FormErrorMessage fontSize={"small"}>
                    Enter your full name
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  id="phoneNumber"
                  isRequired
                  isInvalid={touched.phoneNumber && !values.phoneNumber}
                >
                  <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    errorBorderColor="red.300"
                    placeholder="+91 00000-00000"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={() => onBlur("phoneNumber")}
                    minLength={10}
                    maxLength={10}
                  />
                  <FormErrorMessage fontSize={"small"}>
                    Enter a valid number
                  </FormErrorMessage>
                </FormControl>
              </SimpleGrid>
              <FormControl
                id="email"
                isRequired
                isInvalid={
                  touched.email &&
                  (!!values.emailError || !isValidEmail(values.email))
                }
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
              <SimpleGrid columns={2} spacing={4}>
                <FormControl
                  id="password"
                  isRequired
                  isInvalid={
                    touched.password &&
                    (!!values.passwordError ||
                      !isValidPassword(values.password))
                  }
                >
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
                      borderColor={
                        touched.password &&
                          touched.confirmPassword &&
                          passwordMatch &&
                          !values.passwordError
                          ? "green.400"
                          : "inherit"
                      }
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
                  <FormErrorMessage>{values.passwordError}</FormErrorMessage>
                </FormControl>
                <FormControl
                  id="confirmPassword"
                  isRequired
                  isInvalid={
                    touched.confirmPassword &&
                    (!values.confirmPassword || !passwordMatch)
                  }
                >
                  <FormLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      errorBorderColor="red.300"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={() => onBlur("confirmPassword")}
                      borderColor={
                        touched.password &&
                          touched.confirmPassword &&
                          passwordMatch &&
                          !values.passwordError
                          ? "green.400"
                          : "inherit"
                      }
                    />
                    <InputRightElement h={"full"}>
                      <IconButton
                        variant={"ghost"}
                        borderWidth={2}
                        p={0}
                        size={"sm"}
                        rounded={"full"}
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </IconButton>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage fontSize={"small"}>
                    Password Required
                  </FormErrorMessage>
                </FormControl>
                <Text textColor={"green.400"} fontSize={"small"}>
                  {passwordMatch && !values.passwordError && (
                    <span className="flex items-center">
                      <CheckCircleIcon mr={2} />
                      Password matched!
                    </span>
                  )}
                </Text>
              </SimpleGrid>
              <Checkbox
                id="ageConfirmation"
                name="ageConfirmation"
                isChecked={values.ageConfirmation}
                onChange={handleChange}
                onBlur={() => onBlur("ageConfirmation")}
              >
                I confirm that I am 18 years or older
              </Checkbox>
              <Checkbox
                id="terms"
                name="terms"
                isChecked={values.terms}
                onChange={handleChange}
                onBlur={() => onBlur("terms")}
              >
                I accept the terms and conditions
              </Checkbox>
              <Button
                type="submit"
                bg={"gray.900"}
                color={"gray.50"}
                _hover={{
                  bg: "gray.800",
                }}
                isLoading={isLoading}
                loadingText="Signing up"
                className="group"
                isDisabled={
                  !values.fullName ||
                  !values.phoneNumber ||
                  !values.email ||
                  !values.password ||
                  !values.confirmPassword ||
                  !values.terms ||
                  !values.ageConfirmation
                }
              >
                {isLoading ? (
                  <Loader size={16} strokeWidth={1.2} absoluteStrokeWidth />
                ) : (
                  <Flex alignItems={"start"}>
                    Sign up
                    <MoveRight
                      size={20}
                      strokeWidth={3}
                      absoluteStrokeWidth
                      className="transition-all duration-300 ease-in-out w-0 group-hover:w-10"
                    />
                  </Flex>
                )}
              </Button>
            </Stack>
            <Flex pt={4} mx={"auto"} justify="center">
              <Text as={"span"} display="flex" alignItems="center">
                Already a user?
                <Link
                  href="/login"
                  className="flex items-center text-blue-600 group mx-1 border-b border-transparent hover:border-blue-600 transition-all ease-in-out"
                >
                  <span className="mr-1 ">Login</span>
                  <CircleArrowUp
                    size={16}
                    strokeWidth={1.2}
                    absoluteStrokeWidth
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

export default SignUp;
