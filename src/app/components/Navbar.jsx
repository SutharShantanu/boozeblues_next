"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Heart, House, Package, ShoppingCart, Truck } from "lucide-react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const route = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    route(`/search?query=${searchQuery}`);
    setSearchQuery("");
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
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
          Address
        </Link>
        <Link
          href="/payment"
          className="text-neutral-800 flex px-2 py-1 space-x-2 items-center justify-between hover:bg-neutral-200 hover:shadow-sm rounded-md transition-all ease-in-out"
        >
          Payment
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
              <SearchIcon />
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
            onClick={() => {}}
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
        <Link href="/signup">
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="gray"
            variant="outline"
          >
            Login / Register
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
