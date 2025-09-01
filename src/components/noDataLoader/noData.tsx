import { Box, BoxProps } from "@mui/material";
import { FC } from "react";
import { BeatLoader } from "react-spinners";

interface INoDataProps extends BoxProps {
  loading: boolean;
  error: any;
  message?: string;
}

const NoData: FC<INoDataProps> = ({ loading, error, message, ...rest }) => {
  return (
    <>
      {loading || error || message ? (
        <Box
          {...rest}
          sx={{
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ...rest.sx,
          }}
        >
          {loading ? (
            <BeatLoader size={22} color="var(--primary)" />
          ) : error ? (
            <h5>{error.message}</h5>
          ) : (
            <h5>{message}</h5>
          )}
        </Box>
      ) : null}
    </>
  );
};

export default NoData;
