import {Box,useTheme,useMediaQuery,Typography} from '@mui/material';
import Form from "./form"

const LoginPage = () =>{
    const theme = useTheme();
    const isMobile = useMediaQuery("(mn-width:1000px))");
    return(

        <Box >
            <Box width="100%" textAlign="center" padding= "1rem 6%" backgroundColor={theme.palette.background.alt}>
            <Typography
                fontWeight="bold"
                fontSize="clamp(1rem,2rem,2.25rem)"
                color="primary"
            >
                Connectify
            </Typography>
            </Box>

            <Box width={
                isMobile ? "50%" : "70%"
            } 
            backgroundColor={theme.palette.background.alt} margin="1.5rem auto" p="2rem" borderRadius="6px">
                <Typography 
                    fontWeight="bold" fontSize="0.9rem"
                >
                    Welcome to Connectify a social media platform to connect with your friends.
                </Typography>
                <Form/>

            </Box>
        </Box>
        
    );
};
export default LoginPage;