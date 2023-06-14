import {Box,useTheme,useMediaQuery,Typography, IconButton} from '@mui/material';
import { useDispatch } from "react-redux";
import Form from "./form"
import { setMode } from '../../state';
import { DarkMode,LightMode } from '@mui/icons-material';


const LoginPage = () =>{
    const theme = useTheme();
    const isMobile = useMediaQuery("(mn-width:1000px))");
    const dispatch = useDispatch();
    return(
        
        <Box >
            <Box
            padding= "1rem 6%" 
            backgroundColor={theme.palette.background.alt}
            display="flex"
            justifyContent="space-evenly"
            gap="3rem"
            >
            <Typography
                fontWeight="bold"
                fontSize="clamp(1rem,2rem,2.25rem)"
                color="primary"
            >
                Connectify
            </Typography>
            <IconButton
                onClick={()=>{dispatch(setMode())}}>
                    {theme.palette.mode === "Dark" ?
                    (<DarkMode sx ={{fontSize:"25px"}} />) : (<LightMode sx ={{ fontSize:"25px"}} />) }
                </IconButton>
            
            </Box>

            <Box width={
                isMobile ? "50%" : "70%"
            } 
            backgroundColor={theme.palette.background.alt} margin="1.5rem auto" p="2rem" borderRadius="6px">
                <Typography 
                    fontWeight="bold" fontSize="0.9rem"
                    sx={{
                        marginBottom:"1rem"
                    }}
                >
                    Welcome to Connectify a social media platform to connect with your friends.
                </Typography>
                <Form/>

            </Box>
        </Box>
        
    );
};
export default LoginPage;