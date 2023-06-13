import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import { setLogin } from "../../state";
import FlexBetween from "../../components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { TextField, Typography } from "@mui/material";
import { Box, useTheme, useMediaQuery, IconButton } from "@mui/material";



import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initailRegisterValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

const initailLoginValues = {
    email: "",
    password: ""
};

const Form = () => {
    const [pageType, setPageType] = useState("register");
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);



    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { palette } = useTheme();
    const isMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const handleSubmitForm = async (values, onSubmitProps) => { };

    return (
        <Formik
            onSubmit={handleSubmitForm}
            initialValues={isLogin ? initailLoginValues : initailRegisterValues}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4,minmax(0,1fr))"

                        sx={{
                            "& > div": { gridColumn: isMobile ? undefined : "span 4" },
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.firstName && errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{
                                        gridColumn: "span 2",
                                    }}
                                />

                                <TextField
                                    label="last Name"
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.lastName && errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{
                                        gridColumn: "span 2",
                                    }}
                                />

                                <TextField
                                    label="Location"
                                    name="location"
                                    value={values.location}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.location && errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{
                                        gridColumn: "span 4",
                                    }}
                                />
                                <TextField
                                    label="Occupation"
                                    name="occupation"
                                    value={values.occupation}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.occupation && errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{
                                        gridColumn: "span 4",
                                    }}
                                />
                                <Box
                                    gridColumn="span 4"
                                    border={`0.7px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    padding="0.8rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jgp,.png,.jpeg"
                                        multiple={false}
                                        underline="none"
                                        onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`1px dashed ${palette.primary.main}`}
                                                padding="1rem"
                                                sx={{
                                                    "&:hover": { cursor: "pointer" }
                                                }}
                                            >
                                                {/* <Input {...getInputProps} 
                                                /> */}
                                                {values.picture === "" ? (
                                                    <p>Add Picture Here</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>
                                                            {values.picture.name}
                                                        </Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}
                        <TextField
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{
                                gridColumn: "span 2",
                            }}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                            sx={{
                                gridColumn: "span 2",
                            }
                        } 
                        />

                    </Box>
                </form>
            )}

        </Formik>
    )
}
export default Form;


