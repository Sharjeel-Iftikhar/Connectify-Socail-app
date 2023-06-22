import {
    Box,
    useTheme,
    Typography,
    useMediaQuery,
    Button,
    IconButton,
    InputBase,
    Divider
} from "@mui/material";

import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";

import { useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import WidgetWrapper from "../../components/WidgetWrapper";
import { setPosts } from "../../state";
import UserImage from "../../components/UserImage";

const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false); //  for showing and removing only clicking on image icon in post section
    const [image, setImage] = useState(null);    // to save image from the dropzone
    const [post, setPost] = useState("");       //  to save the overall post record and send over the API.
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    const navigate = useNavigate();

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {

            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await fetch(`http://localhost:3001/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const data = await response.json();
        dispatch(setPosts({ data }));
        setImage(null);
        navigate(0);
        setPost("");
        setIsImage(false);
    };

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="What's on your mind?"
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "1rem",
                        padding: "1rem 2rem",
                    }}

                />
            </FlexBetween>
            {isImage &&
                <Box
                    width="100%"
                    border={`1px solid ${mediumMain}`}
                    borderRadius="5px"
                    padding="0.7rem"
                    mt="1rem"
                >
                    <Dropzone

                        multiple={false}
                        acceptedFiles=".jgp,.png,.jpeg"
                        underline="none"
                        onDrop={(acceptedFiles) => {
                            setImage(acceptedFiles[0]);
                        }}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`1px dashed ${palette.primary.main}`}
                                    padding="1rem"
                                    width="100%"
                                    sx={{
                                        "&:hover": { cursor: "pointer" }
                                    }}
                                >
                                    {!image ? (
                                        <p>Add Image Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>
                                                {image.name}
                                            </Typography>
                                            <IconButton>
                                                <EditOutlined />
                                            </IconButton>
                                        </FlexBetween>
                                    )}

                                </Box>
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{
                                            width: "15px"
                                        }}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}

                    </Dropzone>
                </Box>
            }
            <Divider sx={{ my: "1rem" }} />

            {/* Icons list */}

            <FlexBetween>
                <FlexBetween
                    onClick={() => setIsImage(!isImage)}
                    gap="0.25rem"
                >
                    <ImageOutlined sx={{
                        color: mediumMain,
                        fontSize: "1.25rem"
                    }} />
                    <Typography
                        color={mediumMain}
                        fontSize="1rem"
                        fontWeight="500"
                        sx={{

                            "&:hover": { cursor: "pointer", color: medium }
                        }}
                    >
                        Image
                    </Typography>
                </FlexBetween>
                {isNonMobileScreens ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{ color: mediumMain, fontSize: "1.25rem" }} />
                            <Typography color={mediumMain} fontSize="1rem"
                                fontWeight="500">Clip</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain, fontSize: "1.25rem" }} />
                            <Typography color={mediumMain} fontSize="1rem"
                                fontWeight="500">Attachment</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{ color: mediumMain, fontSize: "1.25rem" }} />
                            <Typography color={mediumMain} fontSize="1rem"
                                fontWeight="500">Audio</Typography>
                        </FlexBetween>
                    </>
                ) : (
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: mediumMain, fontSize: "1.25rem" }} />
                    </FlexBetween>
                )}

                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    POST
                </Button>
            </FlexBetween>

        </WidgetWrapper>
    )



}
export default MyPostWidget;