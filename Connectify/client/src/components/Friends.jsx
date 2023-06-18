import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import UserImage from "./UserImage";
import FlexBetween from "./FlexBetween";
import { setFriends } from "../state";

const Friend = ({friendId,name,subtitle,userPicturePath}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {_id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    
    const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` ,
        "Content-Type": "application/json"},
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  return (
    <FlexBetween>
        <FlexBetween gap='1rem'>
            <UserImage image = {userPicturePath} size ="55px"/>
            <Box
            onClick={() =>{
                navigate(`/profile/${friendId}`);
                navigate(0)
            }}  
            >
                <Typography
                variant="h5"
                color={main}
                fontWeight="bold"
                sx={{ color: palette.primary.light,
                    cursor: "pointer" }}
                >
                    {name}
                </Typography>
                <Typography color={medium} fontSize="0.75rem">
                    {subtitle}
                </Typography>


            </Box>
        </FlexBetween>
        <IconButton
        onClick={patchFriend}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
        </IconButton>
    </FlexBetween>
  )
}
export default Friend;