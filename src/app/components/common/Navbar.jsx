"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Profile from "../../components/common/profile"
import Light_Logo from "../../../assets/4.png";
import Address from "../../components/common/Address"

import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  BadgeIndianRupee,
  CircleArrowUp,
  Heart,
  House,
  Map,
  Package,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../../../redux/slices/userSlice";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState("");
  const [storedToken, setStoredToken] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const data = useSelector((state) => console.log(state)
  )

  const token = useSelector((state) => state.user.token) || localStorage.getItem('token');
  const isAuthenticated = Boolean(token);

  useEffect(() => {
    setStoredToken(localStorage.getItem("token"))

    if (storedToken) {
      dispatch(loginSuccess({ token: storedToken, }));
    }
  }, [dispatch, storedToken]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?query=${searchQuery}`);
    setSearchQuery("");
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("fullName");
    dispatch(logout());
    toast({
      title: "Logged out successfully.",
      description: "You have been logged out of your account.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    router.push("/");
  };

  return (
    <div className="fixed w-full top-0 z-[999] bg-white shadow-md">

      <div className=" flex items-center justify-between w-11/12 mx-auto p-5">
        <Link href="/" className="group">
          <Image src={Light_Logo} className="w-[250px] group-hover:skew-y-1 transition-all ease-in-out" alt="Boozeblues-logo" width={5000} height={5000} />
        </Link>
        <InputGroup maxWidth={"500px"} width={"full"}>
          <Input
            type="search"
            placeholder="Find Beer, Wine & Spirits"
            rounded={"none"}
            _focusVisible={{
              outline: "none",
              backgroundColor: "#EDF2F7",
            }}
            value={searchQuery}
            onChange={handleChange}
          />
          <InputRightElement>
            <Button
              backgroundColor={"gray.900"}
              rounded={"none"}
              className="group"
              _hover={{ backgroundColor: "gray.700" }}
              onClick={handleSearch}
            >
              <SearchIcon
                color={"gray.50"}
                className="group-hover:rotate-90 transition-all ease-in-out"
              />
            </Button>
          </InputRightElement>
        </InputGroup>
        <div className="gap-x-5 flex justify-between items-center">
          <Tooltip hasArrow label="Wishlist" fontSize={"x-small"}>
            <Link href="/wishlist">
              <IconButton
                variant="outline"
                rounded={"none"}
                colorScheme="gray"
                _hover={{
                  backgroundColor: "gray.900",
                }}
                className="border-none group transition-all ease-in-out"
                border={0}
                icon={<Heart size={16} className="group-hover:text-gray-50 transition-all ease-in-out" strokeWidth={1.5} absoluteStrokeWidth />}
                onClick={() => { }}
              />
            </Link>
          </Tooltip>
          <Tooltip hasArrow label="Cart" fontSize={"x-small"}>
            <Link href="/cart">
              <IconButton
                variant="outline"
                rounded={"none"}
                colorScheme="gray"
                _hover={{
                  backgroundColor: "gray.900",
                }}
                border={0}
                className="border-none group transition-all ease-in-out"
                icon={
                  <ShoppingCart size={16} className="group-hover:text-gray-50 transition-all ease-in-out" strokeWidth={1.5} absoluteStrokeWidth />
                }
              />
            </Link>
          </Tooltip>
          <Tooltip hasArrow label="Order" fontSize={"x-small"}>
            <Link href="/order">
              <IconButton
                variant="outline"
                rounded={"none"}
                colorScheme="gray"
                _hover={{
                  backgroundColor: "gray.900",
                }}
                border={0}
                className="border-none group transition-all ease-in-out"
                icon={<Truck size={16} className="group-hover:text-gray-50 transition-all ease-in-out" strokeWidth={1.5} absoluteStrokeWidth />}
              />
            </Link>
          </Tooltip>

          {session ? (
            <div className="flex items-center space-x-2">
              <Profile onClick={handleLogout} />
            </div>
          ) : (
            <div className=" flex items-center justify-between px-3">
              <Link href="/login" className="flex gap-x-1 items-center group border-b border-transparent hover:border-gray-500">
                <span>
                  Login
                </span>
                <CircleArrowUp
                  size={16}
                  strokeWidth={1.2}
                  className="rotate-90 transition-all duration-300 ease-in-out w-0 group-hover:w-5"
                />
              </Link>
              <div className="text-gray-950 mx-2">|</div>
              <Link href="/signup" className="flex gap-x-1 items-center group border-b border-transparent hover:border-gray-500">
                <span>
                  Create Account
                </span>
                <CircleArrowUp
                  size={16}
                  strokeWidth={1.2}
                  className="rotate-45 transition-all duration-300 ease-in-out w-0 group-hover:w-5"
                />
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-100">
        <div className="w-11/12 flex items-center justify-between mx-auto">
          <div className="p-5 w-2/5 flex justify-between items-center">
            <Link
              href="/"
              className="text-neutral-800 flex px-2 py-1 space-x-2 items-center justify-between hover:bg-neutral-200 hover:shadow-sm rounded-md transition-all ease-in-out"
            >
              <House size={16} strokeWidth={1.5} absoluteStrokeWidth />
              <span>Boozeblues</span>
            </Link>
            <Link
              href="/products"
              className="text-neutral-800 flex px-2 py-1 space-x-2 items-center justify-between hover:bg-neutral-200 hover:shadow-sm rounded-md transition-all ease-in-out"
            >
              <Package size={16} strokeWidth={1.5} absoluteStrokeWidth />
              <span>Products</span>
            </Link>
            {/* <Link href="/product/[id]" className="text-neutral-800 ">Single Product</Link> */}
            {/* {products.map(product => (
                    <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="text-neutral-800 ">
                        {product.name}
                    </Link>
                ))} */}
            <Link
              href="/address"
              className="text-neutral-800 flex px-2 py-1 space-x-2 items-center justify-between hover:bg-neutral-200 hover:shadow-sm rounded-md transition-all ease-in-out"
            >
              <Map size={16} strokeWidth={1.5} absoluteStrokeWidth />
              <span>Address</span>
            </Link>
            <Link
              href="/payment"
              className="text-neutral-800 flex px-2 py-1 space-x-2 items-center justify-between hover:bg-neutral-200 hover:shadow-sm rounded-md transition-all ease-in-out"
            >
              <BadgeIndianRupee size={16} strokeWidth={1.5} absoluteStrokeWidth />
              <span>Payment</span>
            </Link>
          </div>
          <div className="p-5">
            <Address />
          </div>
        </div>
      </div>

    </div >

  );
};

export default Navbar;
