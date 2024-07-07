"use client"

import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";

import {
    Button,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { CiHeart, CiShoppingCart, CiDeliveryTruck } from "react-icons/ci";
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
                <Link href="/" className="text-black flex p-2 space-x-2 items-center justify-between">
                    <House size={16} strokeWidth={1.2} absoluteStrokeWidth />
                    <span>
                        Home
                    </span>
                </Link>
                <Link href="/products" className="text-black  flex p-2 space-x-2 items-center justify-between">
                    <Package size={16} strokeWidth={1.2} absoluteStrokeWidth />
                    <span>
                        Products
                    </span>
                </Link>
                {/* <Link href="/product/[id]" className="text-black ">Single Product</Link> */}
                {/* {products.map(product => (
                    <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="text-black ">
                        {product.name}
                    </Link>
                ))} */}
                <Link href="/cart" className="text-black ">Cart</Link>
                <Link href="/address" className="text-black ">Address</Link>
                <Link href="/payment" className="text-black ">Payment</Link>
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
                            onClick={handleSearch}>
                            <SearchIcon />
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Link href="/wishlist">
                    <IconButton
                        variant="outline"
                        colorScheme="gray"
                        icon={
                            <Heart size={16} strokeWidth={1.2} absoluteStrokeWidth />
                        }
                        onClick={() => { }}
                    />
                </Link>
                <Link href="/cart">
                    <IconButton
                        variant="outline"
                        colorScheme="gray"
                        icon={
                            <ShoppingCart size={16} strokeWidth={1.2} absoluteStrokeWidth />
                        }
                    />
                </Link>
                <Link href="/order">
                    <IconButton
                        variant="outline"
                        colorScheme="gray"
                        icon={
                            <Truck size={16} strokeWidth={1.2} absoluteStrokeWidth />
                        }
                    />
                </Link>
                <Link href="/signup">
                    <Button
                        rightIcon={<ArrowForwardIcon />}
                        colorScheme="gray"
                        variant="outline">
                        Login / Register
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
