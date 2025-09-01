import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";
import React from "react";

interface CustomButtonProps extends ButtonProps {
  className?: string;
  loading?: boolean;
  children: React.ReactNode;
}

const ButtonStyled = styled(Button)({
  flexShrink: 0,
  textTransform: "initial",
  whiteSpace: "nowrap",
  fontWeight: "700",
  "&.Mui-disabled": {
    // backgroundColor: "var(--bg_page_color)",
    // color: "var(--text_color)",
  },
});

const CustomButton: React.FC<CustomButtonProps> = ({
  className,
  loading,
  children,
  ...rest
}) => {
  return (
    <ButtonStyled
      className={className ?? ""}
      variant="contained"
      color="primary"
      {...rest}
      disabled={loading || rest?.disabled}
    >
      <span className="inner_wrap">
        {loading ? <CircularProgress size={20} /> : <span>{children}</span>}
      </span>
    </ButtonStyled>
  );
};

export default CustomButton;
