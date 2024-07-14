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
  Link,
  Flex,
  SimpleGrid,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { CheckCircleIcon } from "lucide-react";

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
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [passwordMatch, setPasswordMatch] = useState(true);

  const onBlur = (fieldName) =>
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
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
        values.password === value || values.confirmPassword === value
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

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", values);
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box bg="white" p={8} borderRadius="lg" boxShadow="lg" w="full" maxW="lg">
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">Sign up</Heading>
            <Text fontSize="md" color="gray.600">
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <form onSubmit={onSubmit}>
            {" "}
            {/* Added onSubmit handler to the form */}
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
                    placeholder="Full Name"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={() => onBlur("fullName")}
                  />
                  <FormErrorMessage>Required</FormErrorMessage>
                </FormControl>
                <FormControl
                  id="phoneNumber"
                  isInvalid={touched.phoneNumber && !values.phoneNumber}
                >
                  <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={() => onBlur("phoneNumber")}
                    minLength={10}
                    maxLength={10}
                  />

                  <FormErrorMessage>Required</FormErrorMessage>
                </FormControl>
              </SimpleGrid>
              <FormControl
                id="email"
                isRequired
                isInvalid={
                  touched.email && (!!values.emailError || !values.email)
                }
              >
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
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
                    (!!values.passwordError || !values.password)
                  }
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={() => onBlur("password")}
                      borderColor={
                        touched.password &&
                        touched.confirmPassword &&
                        passwordMatch
                          ? "green.400"
                          : "inherit"
                      }
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{values.passwordError}</FormErrorMessage>
                </FormControl>
                <FormControl
                  id="confirmPassword"
                  isInvalid={touched.confirmPassword && !values.confirmPassword}
                >
                  <FormLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FormLabel>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={() => onBlur("confirmPassword")}
                    borderColor={
                      touched.password &&
                      touched.confirmPassword &&
                      passwordMatch
                        ? "green.400"
                        : "inherit"
                    }
                  />
                  <FormErrorMessage>Required</FormErrorMessage>
                </FormControl>
                <Text textColor={"green.300"} fontSize={"x-small"}>
                  <CheckCircleIcon />
                  {passwordMatch && "Password matched!"}
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
                I agree to the Terms and Conditions
              </Checkbox>
              <Button
                mt={4}
                colorScheme="blue"
                type="submit"
                isDisabled={
                  !values.fullName ||
                  !values.email ||
                  !values.password ||
                  !values.confirmPassword ||
                  !values.terms ||
                  !values.ageConfirmation
                }
              >
                Sign up
              </Button>
            </Stack>
          </form>
          <Stack pt={4}>
            <Text align="center">
              Already a user? <Link color="blue.400">Login</Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
};

export default SignUp;
