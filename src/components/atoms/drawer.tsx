import { Drawer, DrawerProps, IconButton, styled } from "@mui/material";
import { FC } from "react";
import styles from "./atoms.module.scss";
import clsx from "clsx";
import { Close } from "@mui/icons-material";

interface IProps extends DrawerProps {
  maxWidth?: number;
  title?: string;
  noBackdropClose?: boolean;
}

const ModalStyled = styled(Drawer)({});

const CustomDrawer: FC<IProps> = ({
  // maxWidth = 500,
  title,
  ...rest
}) => {
  return (
    <ModalStyled
      {...rest}
      className={clsx(styles.customDrawer, rest.className)}
    >
      {title ? (
        <div className={styles.header}>
          <h4>{title}</h4>
          <IconButton onClick={(e) => rest.onClose(e, "backdropClick")}>
            <Close />
          </IconButton>
        </div>
      ) : null}
      {rest.children}
    </ModalStyled>
  );
};

export default CustomDrawer;
