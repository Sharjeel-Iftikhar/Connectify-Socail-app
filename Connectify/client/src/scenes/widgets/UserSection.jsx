import { Box, Typography, useTheme, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";

import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material";

const UserSection = ({ userId, picturePath }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const token = useSelector(state => state.token);

    const getUser = async () => {
        console.log("userID", userId);
        const response = await fetch(`http://localhost:3001/users/${userId}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });
        const data = await response.json();
        console.log("data", data);
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;

    const { firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
    } = user;

    const fullName = `${firstName}${lastName}`;

    return (

        <WidgetWrapper>
            {/* First Row */}
            <FlexBetween
                gap="5rem"
                pb="1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h6"
                            color={theme.palette.neutral.dark}
                            fontWeight="bold"
                            paddingTop="0.5rem"
                            sx={{
                                "&:hover": {
                                    color: theme.palette.primary.light,
                                    cursor: "pointer"

                                }
                            }}
                        >
                           {fullName.length >= '8'? (firstName) : ({fullName})}
                        </Typography>
                        <Typography color={theme.palette.neutral.medium}>{friends.length} friends</Typography>
                    </Box>

                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>

            <Divider />


            {/* Second Row */}

            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="2rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="medium" sx={{ color: theme.palette.neutral.main }} />
                    <Typography color={theme.palette.neutral.medium} fontSize="0.9rem">{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="2rem">
                    <WorkOutlineOutlined fontSize="medium" sx={{ color: theme.palette.neutral.main }} />
                    <Typography color={theme.palette.neutral.medium}fontSize="0.9rem" >{occupation}</Typography>
                </Box>
            </Box>

            <Divider />

            {/* THIRD ROW */}

            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={theme.palette.neutral.medium}>Who's viewed your profile</Typography>
                    <Typography color={theme.palette.neutral.main} fontWeight="500" fontSize="0.9rem">
                        {viewedProfile}
                    </Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={theme.palette.neutral.medium}>Impressions of your post</Typography>
                    <Typography color={theme.palette.neutral.main} fontWeight="500" fontSize="0.9rem">
                        {impressions}
                    </Typography>
                </FlexBetween>
            </Box>

            <Divider />

            {/* FOURTH ROW */}

            <Box p="1rem 0">
                <Typography
                    color={theme.palette.neutral.main}
                    fontSize="1rem"
                    mb="1rem"
                    fontWeight="bold"
                >
                    Socail Profiles
                </Typography>

                <FlexBetween gap="1rem" mb="1rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Box>
                            <Typography color={theme.palette.neutral.main} fontWeight="bold">Twitter</Typography>
                            <Typography color={theme.palette.neutral.medium} fontSize="0.9rem">Social Network</Typography>
                        </Box>

                    </FlexBetween>
                    <EditOutlined sx={{ color: theme.palette.neutral.main }} />
                
                   
                </FlexBetween>
                <FlexBetween gap="1rem" mb="1rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/linkedIn.png" alt="LinkedIn" />
                        <Box>
                            <Typography color={theme.palette.neutral.main} fontWeight="bold">LinkedIn</Typography>
                            <Typography color={theme.palette.neutral.medium} fontSize="0.9rem">Network PlatForm</Typography>
                        </Box>

                    </FlexBetween>
                    <EditOutlined sx={{ color: theme.palette.neutral.main }} />
                
                   
                </FlexBetween>


            </Box>

        </WidgetWrapper>
    )
}
export default UserSection;
