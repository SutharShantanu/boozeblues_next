"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Profile from "../../components/common/profile"

import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  BadgeIndianRupee,
  Heart,
  House,
  Map,
  Package,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../../../redux/slices/userSlice";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const { token } = useSelector((state) => state.user) || localStorage.getItem("token");
  const isAuthenticated = Boolean(token);
  console.log(isAuthenticated);


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");

    if (storedToken && storedEmail) {
      dispatch(loginSuccess({ token: storedToken, email: storedEmail }));
    }
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?query=${searchQuery}`);
    setSearchQuery("");
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className="fixed flex justify-between w-full top-0 z-1000 bg-gray-50 shadow-md">
      <div className="p-5 w-2/5 flex justify-between items-center border border-red-500">
        <Link
          href="/"
          className="text-neutral-800 flex px-2 py-1 space-x-2 items-center justify-between hover:bg-neutral-200 hover:shadow-sm rounded-md transition-all ease-in-out"
        >
          <House size={16} strokeWidth={1.2} absoluteStrokeWidth />
          <span>Home</span>
        </Link>
        <Link
          href="/products"
          className="text-neutral-800 flex px-2 py-1 space-x-2 items-center justify-between hover:bg-neutral-200 hover:shadow-sm rounded-md transition-all ease-in-out"
        >
          <Package size={16} strokeWidth={1.2} absoluteStrokeWidth />
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
          <Map size={16} strokeWidth={1.2} absoluteStrokeWidth />
          <span>Address</span>
        </Link>
        <Link
          href="/payment"
          className="text-neutral-800 flex px-2 py-1 space-x-2 items-center justify-between hover:bg-neutral-200 hover:shadow-sm rounded-md transition-all ease-in-out"
        >
          <BadgeIndianRupee size={16} strokeWidth={1.2} absoluteStrokeWidth />
          <span>Payment</span>
        </Link>
      </div>
      <div className="p-5 w-2/5 flex justify-between items-center">
        <InputGroup w="25wv">
          <Input
            type="search"
            placeholder="Search here anything"
            _focusVisible={{
              outline: "none",
              backgroundColor: "#EDF2F7",
            }}
            value={searchQuery}
            onChange={handleChange}
          />
          <InputRightElement>
            <Button
              style={{ backgroundColor: "transparent" }}
              onClick={handleSearch}
            >
              <SearchIcon
                sx={{ color: "gray" }}
                _hover={{
                  color: "gray.600",
                  transition: "color 0.2s ease-in-out",
                }}
              />
            </Button>
          </InputRightElement>
        </InputGroup>
        <Link href="/wishlist">
          <IconButton
            variant="outline"
            colorScheme="gray"
            className="border-none"
            border={0}
            icon={<Heart size={16} strokeWidth={1.2} absoluteStrokeWidth />}
            onClick={() => { }}
          />
        </Link>
        <Link href="/cart">
          <IconButton
            variant="outline"
            colorScheme="gray"
            border={0}
            icon={
              <ShoppingCart size={16} strokeWidth={1.2} absoluteStrokeWidth />
            }
          />
        </Link>
        <Link href="/order">
          <IconButton
            variant="outline"
            colorScheme="gray"
            border={0}
            className="rounded-full"
            icon={<Truck size={16} strokeWidth={1.2} absoluteStrokeWidth />}
          />
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center space-x-2">
            <Profile onClick={handleLogout} />
          </div>
        ) : (
          <Link href="/login">
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="gray"
              variant="outline"
            >
              Login / Register
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
