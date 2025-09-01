import { styled, TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { BeatLoader } from "react-spinners";

interface INoDataProps {
  loading: boolean;
  error: any;
  message?: string;
}

const RowStyled = styled(TableRow)({
  "&:hover": {
    backgroundColor: "transparent !important",
  },
  ".loader_wrap": {
    minHeight: "140px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const NoDataTable: FC<INoDataProps> = ({ loading, error, message }) => {
  return (
    <>
      {loading || error || message ? (
        <RowStyled>
          <TableCell colSpan={100}>
            <div className="loader_wrap">
              {loading ? (
                <BeatLoader size={22} color="var(--primary)" />
              ) : error ? (
                <h5>{error.message}</h5>
              ) : (
                <h5>{message}</h5>
              )}
            </div>
          </TableCell>
        </RowStyled>
      ) : null}
    </>
  );
};

export default NoDataTable;
