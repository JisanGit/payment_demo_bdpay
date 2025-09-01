// import { styled } from "@mui/system";
import { Box, BoxProps } from "@mui/material";
import { FC } from "react";
import { LogoImage } from "src/assets/svg";
import pjson from ".././../package.json";

// const StyledLogo = styled("div")({
//   color: "",
//   fontWeight: 600,
// });

interface IProps extends BoxProps {
  fontSize?: number;
  color?: string;
}

const Logo: FC<IProps> = ({ fontSize = 30, color = "#fff", ...rest }) => {
  return (
    <Box
      {...rest}
      sx={{
        fontSize,
        color,
        display: "flex",
        alignItems: "flex-end",
        fontWeight: 600,
        whiteSpace: "nowrap",
        i: {
          flexShrink: 0,
          fontSize: "0.45em",
          fontWeight: 300,
        },
        svg: {
          height: "auto",
          width: "6em",
        },
        ...rest.sx,
      }}
    >
      <LogoImage /> <i>{pjson.version}</i>
    </Box>
  );
};
export default Logo;
