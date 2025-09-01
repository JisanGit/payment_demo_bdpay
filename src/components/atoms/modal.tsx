import { Box, IconButton, Modal, ModalProps, styled } from "@mui/material";
import { FC } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from "./atoms.module.scss";
import { IoClose } from "react-icons/io5";

interface IProps extends ModalProps {
  maxWidth?: number;
  title?: string;
  noClose?: boolean;
  noBackdropClose?: boolean;
}

const ModalStyled = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  ".MuiBackdrop-root": {
    backgroundColor: "var(--modal_backdrop)",
  },
  ".close_icon": {
    color: "var(--error)",
    position: "absolute",
    right: 0,
    top: "9px",
    opacity: 0.6,
    transition: "0.1s linear",
    "&:hover": {
      opacity: 1,
    },
  },
});

const CustomModal: FC<IProps> = ({
  maxWidth = 500,
  title,
  noClose,
  noBackdropClose,
  ...rest
}) => {
  return (
    <ModalStyled
      {...rest}
      onClose={() => (noBackdropClose ? null : rest.onClose)}
    >
      <Box
        className={styles.modal_body}
        sx={{
          maxWidth: `${maxWidth}px`,
        }}
      >
        <div className={styles.heading}>
          {title ? <h5>{title}</h5> : null}
          {!noClose ? (
            <IconButton
              disableRipple
              color="error"
              className="close_icon"
              onClick={(e) => rest.onClose(e, "backdropClick")}
            >
              <IoClose size={30} />
            </IconButton>
          ) : null}
        </div>
        <div className={styles.modal_content}>{rest.children}</div>
      </Box>
    </ModalStyled>
  );
};

export default CustomModal;
