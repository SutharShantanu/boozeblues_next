import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { CircleCheck, Loader, MapPin } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const initialValues = {
    flatRoomNo: "",
    buildingName: "",
    landmark: "",
    city: "",
    pin: "",
};

const Address = ({ email }) => {
    const dispatch = useDispatch();
    const address = useSelector((state) => state.address);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [values, setValues] = useState(initialValues);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    // useEffect(() => {
    //     const fetchAddress = async () => {
    //         try {
    //             const response = await axios.get(`/api/address?email=${email}`);
    //             if (response.status === 200) {
    //                 console.log(response.data);
    //                 const addressData = response.data.address;
    //                 const [flatRoomNo, buildingName, landmark, cityPin] = addressData.split(", ");
    //                 const [city, pin] = cityPin ? cityPin.split(" - ") : ["", ""];
    //                 setValues({ flatRoomNo, buildingName, landmark, city, pin });
    //             }
    //         } catch (error) {
    //             console.error('Failed to fetch address:', error);
    //             toast({
    //                 title: "Fetch Failed",
    //                 description: `An error occurred while fetching your address. ${error}`,
    //                 status: "error",
    //                 position: "bottom-right",
    //                 duration: 3000,
    //                 isClosable: true,
    //             });
    //         }
    //     };

    //     fetchAddress();
    // }, [email, toast]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        const formattedValue = name !== 'pin' ? value.charAt(0).toUpperCase() + value.slice(1) : value;

        if (name === "pin" && (value.length > 6 || !/^\d*$/.test(value))) {
            setErrors((prev) => ({
                ...prev,
                pin: value.length > 6 ? "Pin code must be 6 digits." : "Invalid Pin",
            }));
            return;
        } else {
            setErrors((prev) => ({
                ...prev,
                pin: undefined,
            }));
        }

        setValues(prevValues => ({
            ...prevValues,
            [name]: formattedValue,
        }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));

        if (name === "pin" && values.pin.length !== 6) {
            setErrors((prev) => ({
                ...prev,
                pin: "Pin code must be 6 digits.",
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                pin: undefined,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!values.flatRoomNo || !values.buildingName || !values.city) {
            toast({
                title: "Missing Information",
                description: "Please ensure that House No, Apartment, and City fields are filled.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            setIsLoading(false);
            return;
        }

        if (values.pin.length !== 6) {
            toast({
                title: "Invalid Pin Code",
                description: "The pin code must be 6 digits long. Please correct it and try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            setIsLoading(false);
            return;
        }

        const addressString = `${values.flatRoomNo || ""}${values.flatRoomNo && values.buildingName ? ", " : ""}${values.buildingName || ""}${values.buildingName && values.landmark ? ", " : ""}${values.landmark || ""}${(values.landmark || values.buildingName || values.flatRoomNo) && values.city ? ", " : ""}${values.city || ""}${values.city && values.pin ? " - " : ""}${values.pin || ""}`;

        const addressData = JSON.stringify({
            email,
            address: addressString,
        });
        try {
            const response = await axios.post('/api/address', addressData);

            if (response.status == 200) {
                console.log(response.data);
                toast({
                    title: "Address Updated",
                    description: "Your delivery address has been successfully updated.",
                    status: "success",
                    position: "bottom-right",
                    duration: 3000,
                    isClosable: true,
                });
                onClose();
            }
        } catch (error) {
            console.error('Failed to update address:', error);
            toast({
                title: "Update Failed",
                description: "An error occurred while updating your address. Please try again later.",
                status: "error",
                position: "bottom-right",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };


    const addressString = `${values.flatRoomNo || ""}${values.flatRoomNo && values.buildingName ? ", " : ""}${values.buildingName || ""}${values.buildingName && values.landmark ? ", " : ""}${values.landmark || ""}${(values.landmark || values.buildingName || values.flatRoomNo) && values.city ? ", " : ""}${values.city || ""}${values.city && values.pin ? " - " : ""}${values.pin || ""}`;

    return (
        <div>
            <Modal
                isCentered
                scrollBehavior='inside'
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
                motionPreset="scale"
            >
                <ModalOverlay backdropFilter="blur(5px)" />
                <ModalContent rounded={"none"}>
                    <ModalHeader>Add Delivery Address</ModalHeader>
                    <ModalCloseButton rounded={"none"} className='transition-all ease-in-out ' _hover={{ bgColor: "gray.900", color: "gray.50" }} />
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <SimpleGrid columns={2} spacing={4}>
                                <FormControl
                                    id="flatRoomNo"
                                    isRequired
                                    isInvalid={touched.flatRoomNo && !values.flatRoomNo}
                                >
                                    <FormLabel htmlFor="flatRoomNo">House No</FormLabel>
                                    <Input
                                        name="flatRoomNo"
                                        id="flatRoomNo"
                                        fontSize="small"
                                        rounded={"none"}
                                        className="!shadow-none"
                                        _focusVisible={{ outline: "none" }}
                                        errorBorderColor="red.300"
                                        placeholder="House / Flat / Block No"
                                        value={values.flatRoomNo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.flatRoomNo && !values.flatRoomNo && (
                                        <FormErrorMessage fontSize={"small"}>House No is required</FormErrorMessage>
                                    )}
                                </FormControl>
                                <FormControl
                                    id="buildingName"
                                    isRequired
                                    isInvalid={touched.buildingName && !values.buildingName}
                                >
                                    <FormLabel htmlFor="buildingName">Apartment</FormLabel>
                                    <Input
                                        name="buildingName"
                                        id="buildingName"
                                        fontSize="small"
                                        rounded={"none"}
                                        className="!shadow-none"
                                        _focusVisible={{ outline: "none" }}
                                        errorBorderColor="red.300"
                                        placeholder="Apartment / Road / Area"
                                        value={values.buildingName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.buildingName && !values.buildingName && (
                                        <FormErrorMessage fontSize={"small"}>Apartment is required</FormErrorMessage>
                                    )}
                                </FormControl>
                            </SimpleGrid>
                            <FormControl
                                id="landmark"
                                mt={4}
                            >
                                <FormLabel htmlFor="landmark">Landmark (Optional)</FormLabel>
                                <Input
                                    name="landmark"
                                    id="landmark"
                                    fontSize="small"
                                    rounded={"none"}
                                    className="!shadow-none"
                                    _focusVisible={{ outline: "none" }}
                                    errorBorderColor="red.300"
                                    placeholder="Landmark"
                                    value={values.landmark}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </FormControl>
                            <SimpleGrid columns={2} spacing={4} mt={4}>
                                <FormControl
                                    id="city"
                                    isRequired
                                    isInvalid={touched.city && !values.city}
                                >
                                    <FormLabel htmlFor="city">City</FormLabel>
                                    <Input
                                        name="city"
                                        id="city"
                                        fontSize="small"
                                        rounded={"none"}
                                        className="!shadow-none"
                                        _focusVisible={{ outline: "none" }}
                                        errorBorderColor="red.300"
                                        placeholder="City"
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.city && !values.city && (
                                        <FormErrorMessage fontSize={"small"}>City is required</FormErrorMessage>
                                    )}
                                </FormControl>
                                <FormControl
                                    id="pin"
                                    isRequired
                                    isInvalid={touched.pin && !values.pin}
                                >
                                    <FormLabel htmlFor="pin">Pin Code</FormLabel>
                                    <Input
                                        id="pin"
                                        name="pin"
                                        type="text"
                                        fontSize="small"
                                        rounded={"none"}
                                        className="!shadow-none"
                                        _focusVisible={{ outline: "none" }}
                                        errorBorderColor="red.300"
                                        placeholder="Pin Code"
                                        value={values.pin}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.pin && (errors.pin || !values.pin) && (
                                        <FormErrorMessage fontSize={"small"}>{errors.pin}</FormErrorMessage>
                                    )}
                                </FormControl>
                            </SimpleGrid>
                            <Flex align="center" gap="2" mt={4}>
                                <Button
                                    type="submit"
                                    bg={"gray.900"}
                                    color={"gray.50"}
                                    rounded={"none"}
                                    w={"full"}
                                    _hover={{
                                        bg: "gray.800",
                                    }}
                                    py={"0"}
                                    isLoading={isLoading}
                                    loadingText="Saving Address"
                                    className="group"
                                >
                                    {isLoading ? (
                                        <Loader size={16} strokeWidth={1.2} />
                                    ) : (
                                        <Flex alignItems={"center"}>
                                            <Text fontSize="smaller">
                                                Save Address
                                            </Text>
                                            <CircleCheck
                                                size={16}
                                                strokeWidth={1.5}
                                                className="transition-all duration-300 ease-in-out w-0 group-hover:w-5 ml-2"
                                            />
                                        </Flex>
                                    )}
                                </Button>
                            </Flex>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Text mt={2} fontSize="xs" noOfLines={1}>
                            {addressString || "Your address preview will display here."}
                        </Text>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Flex
                cursor="pointer"
                direction="column"
                onClick={onOpen}
                px={2}
                py={"2px"}
                bg="gray.900"
                color="gray.50"
                rounded="none"
                borderColor="gray.800"
            >
                <Flex align="center" gap="2">
                    <MapPin size={16} absoluteStrokeWidth strokeWidth={1.5} />
                    <Text fontSize="sm">Update Address</Text>
                </Flex>

            </Flex>
        </div>
    );
};

export default Address;
