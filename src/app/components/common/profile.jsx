import React from "react";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Button,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

const Profile = ({ onClick }) => {
  const { email, fullName } = useSelector((state) => state.user);
  console.log(email);


  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        shadow={"md"}
        borderWidth={"1px"}
        borderColor={"gray.300"}
        p={0}
      >
        <Avatar size={"sm"} name={fullName} className="avatar-hover" />
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem>
            <Text fontSize='lg' display={"block"} >{fullName}</Text>
            <Text fontSize='xs' display={"block"}>{email}</Text>
          </MenuItem>
          <MenuItem icon={<AddIcon />}>Account</MenuItem>
          <MenuItem icon={<AddIcon />}>Orders</MenuItem>
          <MenuItem icon={<AddIcon />}>Wishlist</MenuItem>
          <MenuItem>Payments</MenuItem>
          <MenuItem>Addresses</MenuItem>
          <MenuItem as="button" onClick={onClick}>
            Logout
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem>Contact Us</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default Profile;
