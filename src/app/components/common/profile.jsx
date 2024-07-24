import React, { useEffect, useState } from "react";
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
  Tooltip,
  Box,
} from "@chakra-ui/react";
import { BadgeIndianRupee, CircleHelp, CircleUserRound, Heart, HeartHandshake, LogOut, Map, Truck } from "lucide-react";
import { useSelector } from "react-redux";
import axios from 'axios';

const Profile = ({ onClick }) => {
  const userId = useSelector(state => state.user.user_id);
  console.log("userId", userId)
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/user/profile`, {
          headers: { 'user_id': userId }
        });
        setUserData(response.data.userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (!userData) return null;

  const { fullName, email } = userData;

  return (
    <Menu>
      <Tooltip hasArrow label={fullName} fontSize={"x-small"}>
        <MenuButton
          as={Button}
          rounded={"full"}
          shadow={"md"}
          borderWidth={"1px"}
          borderColor={"gray.300"}
          p={0}
          _hover={{ bg: "gray.100" }}
        >
          <Avatar size={"sm"} backgroundColor={"gray.900"} name={fullName} className="avatar-hover" />
        </MenuButton>
      </Tooltip>
      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem>
            <Box>
              <Text fontSize='md' fontWeight="bold">{fullName}</Text>
              <Text fontSize='sm' color="gray.600">{email}</Text>
            </Box>
          </MenuItem>
          <MenuItem icon={<CircleUserRound size={16} strokeWidth={1.5} absoluteStrokeWidth />}>Account</MenuItem>
          <MenuItem icon={<Truck size={16} strokeWidth={1.5} absoluteStrokeWidth />}>Orders</MenuItem>
          <MenuItem icon={<Heart size={16} strokeWidth={1.5} absoluteStrokeWidth />}>Wishlist</MenuItem>
          <MenuItem icon={<BadgeIndianRupee size={16} strokeWidth={1.5} absoluteStrokeWidth />}>Payments</MenuItem>
          <MenuItem icon={<Map size={16} strokeWidth={1.5} absoluteStrokeWidth />}>Addresses</MenuItem>
          <MenuItem as="button" icon={<LogOut size={16} strokeWidth={1.5} absoluteStrokeWidth />} onClick={onClick}>
            Logout
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem icon={<HeartHandshake size={16} strokeWidth={1.5} absoluteStrokeWidth />}>Contact Us</MenuItem>
          <MenuItem icon={<CircleHelp size={16} strokeWidth={1.5} absoluteStrokeWidth />}>FAQ</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default Profile;
