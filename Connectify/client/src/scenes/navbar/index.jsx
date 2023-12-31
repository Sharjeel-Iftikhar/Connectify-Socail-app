import { useState } from 'react';
import {
    IconButton,
    InputBase,
    Select,
    useTheme,
    Typography,
    useMediaQuery,
    MenuItem,
    FormControl,
    Box
} from '@mui/material';
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from '../../state';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../../components/FlexBetween';

const NavPage = () => {

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;


    const fullName = user.firstName;

    return (
        <FlexBetween backgroundColor={alt} padding="1rem 6%">
            <FlexBetween gap="2.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem,2rem,2.25rem)"
                    color="primary"
                    onClick={() => navigate('/home')}
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                            cursor: "pointer"
                        }
                    }}
                >
                    Connectify
                </Typography>
                {isNonMobileScreen && (
                    <FlexBetween
                        backgroundColor={neutralLight}
                        borderRadius="9px"
                        padding="0.2rem 1rem"
                        gap="3rem"
                    >
                        <InputBase
                            placeholder='Search...'

                        />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>

            {isNonMobileScreen ?
                (<FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ?
                            (<DarkMode sx={{ fontSize: "25px" }} />) // dark mode icon 
                            : (<LightMode sx={{ color: dark, fontSize: "25px" }} />)}  {/* light mode icon */}
                    </IconButton>
                    <Message sx={{ fontSize: "25px" }} />
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />

                    <FormControl variant='standard' value={fullName}>
                        <Select value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.5rem",
                                    width: "3rem"
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight
                                }
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem value="Logout" onClick={() => dispatch(setLogout())}>Logout</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
                ) : (<IconButton onClick={() => setIsMobileMenuToggled(!isNonMobileScreen)}>
                    <Menu />
                </IconButton>
                )}
            {!isNonMobileScreen && isMobileMenuToggled && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    maxWidth="500px"
                    minWidth="300px"
                    backgroundColor={background}
                >
                    {/* CLOSE ICON */}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton
                            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    {/* MENU ITEMS */}
                    <FlexBetween
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="3rem"
                    >
                        <IconButton
                            onClick={() => dispatch(setMode())}
                            sx={{ fontSize: "25px" }}
                        >
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: dark, fontSize: "25px" }} />
                            )}
                        </IconButton>
                        <Message sx={{ fontSize: "25px" }} />
                        <Notifications sx={{ fontSize: "25px" }} />
                        <Help sx={{ fontSize: "25px" }} />
                        <FormControl variant="standard" value={fullName}>
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem",
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight,
                                    },
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>
                                    Log Out
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>
                </Box>
            )}

        </FlexBetween>
    );
};
export default NavPage;