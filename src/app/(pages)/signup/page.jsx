"use client"

import React, { useReducer, useState } from "react";
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

// Initial state for the form
const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  streetAddress: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  terms: false,
  ageConfirmation: false,
  errors: {},
};

// Reducer function to handle state updates
const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "VALIDATE":
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  // Function to handle form field changes
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    dispatch({
      type: "CHANGE",
      field: id,
      value: type === "checkbox" ? checked : value,
    });
  };

  // Function to validate the form
  const validateForm = () => {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      streetAddress,
      city,
      state,
      postalCode,
      country,
      ageConfirmation,
      terms,
    } = state;

    const errors = {};

    if (!fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password should be at least 6 characters";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!ageConfirmation) {
      errors.ageConfirmation = "You must confirm you are 18 years or older";
    }
    if (!terms) {
      errors.terms = "You must agree to the terms and conditions";
    }

    dispatch({ type: "VALIDATE", errors });
    return errors;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Handle form submission logic here
      alert(JSON.stringify(state, null, 2));
      // Example: Make API call or perform other actions
    }
  };

  const { errors } = state;

  // Check if both checkboxes are checked
  const isFormValid =
    state.ageConfirmation && state.terms && // Checkboxes are checked
    state.fullName.trim() !== "" &&
    state.email.trim() !== "" &&
    state.password.trim() !== "" &&
    state.confirmPassword.trim() !== ""; // Other fields are filled

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
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <SimpleGrid columns={2} spacing={4}>
                <FormControl isInvalid={errors.fullName} id="fullName"
                  isRequired>
                  <FormLabel htmlFor="fullName">Full Name</FormLabel>
                  <Input
                    id="fullName"
                    placeholder="Full Name"
                    value={state.fullName}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.phoneNumber} >
                  <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                  <Input
                    id="phoneNumber"
                    placeholder="Phone Number"
                    value={state.phoneNumber}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>
              <FormControl isInvalid={errors.email} id="email"
                  isRequired>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  value={state.email}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <SimpleGrid columns={2} spacing={4}>
                <FormControl
                  isInvalid={errors.password}
                  id="password"
                  isRequired
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={state.password}
                      onChange={handleChange}
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
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.confirmPassword}>
                  <FormLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FormLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={state.confirmPassword}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>
              <Checkbox
                id="ageConfirmation"
                isChecked={state.ageConfirmation}
                onChange={handleChange}
              >
                I confirm that I am 18 years or older
              </Checkbox>
              <FormErrorMessage>{errors.ageConfirmation}</FormErrorMessage>
              <Checkbox
                id="terms"
                isChecked={state.terms}
                onChange={handleChange}
              >
                I agree to the Terms and Conditions
              </Checkbox>
              <FormErrorMessage>{errors.terms}</FormErrorMessage>
              <Button
                mt={4}
                colorScheme="blue"
                type="submit"
                isDisabled={!isFormValid}
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
