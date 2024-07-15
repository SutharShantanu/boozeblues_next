'use client'


import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
// import { useForm } from "react-hook-form";

const Login = () => {
  //   const {
  //     handleSubmit,
  //     register,
  //     formState: { errors, isSubmitting },
  //   } = useForm();

  const handleSubmit = () => {};

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  return (
    <div className="border h-[91vh] border-purple-600 flex items-center justify-center p-2">
      <div className="border p-5 border-gray-200 mx-auto w-fit flex items-center justify-center bg-gray-50 rounded-md shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
          //    isInvalid={errors.name}
          >
            <FormLabel htmlFor="name">First name</FormLabel>
            <Input
              id="name"
              placeholder="name"
              //   {...register("name", {
              //     required: "This is required",
              //     minLength: { value: 4, message: "Minimum length should be 4" },
              //   })}
            />
            <FormErrorMessage>
              {/* {errors.name && errors.name.message} */}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            //   isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
