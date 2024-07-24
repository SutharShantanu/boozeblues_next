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

const Address = () => {
    const dispatch = useDispatch();
    const user_id = useSelector((state) => state.user.user_id);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState("");
    const [addressFetched, setAddressFetched] = useState("");

    useEffect(() => {
        // Fetch current address from server if necessary
        const fetchAddress = async () => {
            if (user_id) {
                try {
                    const response = await axios.get(`/api/address/`, {
                        headers: {
                            Authorization: Bearer ${token},
                            'Content-Type': 'application/json',
                        },
                        data: { user_id },
                    });
                    setValues(response.data);
                } catch (error) {
                    console.error("Failed to fetch address:", error);
                }
            }
        };
        fetchAddress();
    }, [user_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`/api/address/${user_id}`, values);
            dispatch(setAddress(values));
            toast({
                title: "Address updated.",
                description: "Your address has been updated successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            onClose();
        } catch (error) {
            console.error("Failed to update address:", error);
            toast({
                title: "Update failed.",
                description: "There was an issue updating your address. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
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
                                        name="pin"
                                        id="pin"
                                        fontSize="small"
                                        rounded={"none"}
                                        className="!shadow-none"
                                        _focusVisible={{ outline: "none" }}
                                        errorBorderColor="red.300"
                                        placeholder="Pin Code"
                                        value={values.pin}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        maxLength={6}
                                    />
                                    {touched.pin && errors.pin && (
                                        <FormErrorMessage fontSize={"small"}>{errors.pin}</FormErrorMessage>
                                    )}
                                </FormControl>
                            </SimpleGrid>
                            <Flex direction={"column"} alignItems={"center"} justifyContent={"center"} mt={8}>
                                <Button
                                    leftIcon={isLoading ? <Loader className='animate-spin' size={16} /> : <CircleCheck size={16} />}
                                    isLoading={isLoading}
                                    loadingText='Saving'
                                    type='submit'
                                    w={"full"}
                                    size={"sm"}
                                    rounded={"none"}
                                    className="shadow-none !ring-0"
                                    colorScheme='gray'
                                    variant={"solid"}
                                >
                                    Save Address
                                </Button>
                            </Flex>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Text textAlign={"center"} fontSize={"small"}>Entered Wrong Address? <Button fontSize={"small"} onClick={() => setValues(initialValues)} size={"small"} variant="link" colorScheme='blue'>Clear Form</Button></Text>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <div onClick={onOpen} className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                    <MapPin size={20} />
                    <Text as="span" fontSize="small">{addressFetched || "Add Delivery Address"}</Text>
                </div>
                <Button size="sm" rounded="none" className="shadow-none !ring-0" colorScheme="blue" variant="outline">Edit</Button>
            </div>
        </div>
    );
};

export default Address;
