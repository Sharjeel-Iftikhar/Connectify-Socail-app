import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween gap="1rem">
                <Typography color={dark} varient="h5" fontWeight="bold">
                    Sponsored
                </Typography>
                <Typography color={medium} fontSize="0.8rem" fontWeight="500">
                    Create Ad
                </Typography>
            </FlexBetween>
            <img
                width="100%"
                height="auto"
                alt="advert"
                src="http://localhost:3001/assets/info2.jpeg"
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            />
            <FlexBetween>
                <Typography color={main} fontSize="1rem">KFC</Typography>
                <Typography color={medium} fontSize="0.8rem">KFCFastFood.com</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0" fontSize="0.8rem">
            Prepare to be tantalized by a symphony of flavors as KFC's golden-brown, 
            perfectly seasoned chicken dances on your taste buds. From the crispy 
            crunch that unveils a succulent tenderness to the magical blend of
             spices that lingers on your palate.
            </Typography>
        </WidgetWrapper>
    );
};
export default AdvertWidget;