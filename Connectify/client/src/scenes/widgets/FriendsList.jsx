import { Typography, useTheme, Box } from '@mui/material';
import Friend from "../../components/Friends";
import WidgetWrapper from "../../components/WidgetWrapper";


import { setFriends } from '../../state';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


const FriendsList = ({ userId }) => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const friends = useSelector(state => state.user.friends);

    const getFriends = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}/friends`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    }

    useEffect(() => {
        getFriends();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <WidgetWrapper>
            <Typography
                fontWeight="bold"
                fontSize="h5"
                color={palette.neutral.dark}
                sx={{ mb: "1.5rem" }}
            >
                FriendList
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.3rem">
                {friends.map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    )
};
export default FriendsList;
