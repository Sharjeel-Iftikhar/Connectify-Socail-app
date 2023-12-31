import { Box, useMediaQuery } from "@mui/material";
import NavPage from "../../scenes/navbar";
import { useSelector } from "react-redux";
import UserSection from "../widgets/UserSection";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidgets";
import AdvertWidget from "../widgets/AdvertWidgets";
import FriendsWidget from "../widgets/FriendsList";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    return (
        <Box>
            <NavPage />
            {/* User Section */}
            <Box
                width="100%"
                padding="2rem 3%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    {console.log("Id", _id)}
                    <UserSection userId={_id} picturePath={picturePath} />
                </Box>

                {/* PostsboX */}


                <Box flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "1rem"}>
                    <MyPostWidget picturePath={picturePath} />
                    <PostsWidget userId={_id} />
                </Box>



                {/* Friends */}
                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        <AdvertWidget />
                        <Box m="2rem 0" />
                        <FriendsWidget userId={_id} />
                    </Box>
                )}
            </Box>
        </Box>
    )
}
export default HomePage;