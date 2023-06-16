import { Box,useMediaQuery } from "@mui/material";
import NavPage from "../../scenes/navbar";
import { useSelector } from "react-redux";
import UserSection from "../widgets/UserSection";

const HomePage = () =>{
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    return(
        <Box>
            <NavPage />
            {/* User Section */}
            <Box
            width="100%"
            padding="2rem 6%"
            display ={isNonMobileScreens ? "flex" : "block"}
            gap="0.5rem"
            justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    {console.log("Id", _id)}
                <UserSection userId={_id} picturePath={picturePath} />
                </Box>
            </Box>
             {/* PostsboX */}
            <Box>
               
            <Box flexBasis={isNonMobileScreens ? "42%" : undefined}
             mt={isNonMobileScreens ? undefined : "2rem"}>

             </Box>
             
            </Box>
             {/* Friends */}
            <Box>
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}></Box>
            </Box>
        </Box>
    )
}
export default HomePage;