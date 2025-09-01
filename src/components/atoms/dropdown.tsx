import { Box, Menu, MenuItem, MenuItemProps, MenuProps } from "@mui/material";
// import { styled } from "@mui/system";
import React, { ReactNode } from "react";
import styles from "./atoms.module.scss";

interface IOption extends MenuItemProps {
  name: string;
  icon?: ReactNode;
}
interface IPropsMenu extends MenuProps {
  options: IOption[];
}

const DropDownMenu: React.FC<IPropsMenu> = ({ options, ...rest }) => {
  return (
    <Box sx={{ lineHeight: 1 }}>
      {rest.children}
      <Menu className={styles.menu_root} {...rest}>
        {options.map((item) => (
          <MenuItem
            {...item}
            onClick={(e) => {
              item.onClick(e);
              rest.onClose(e, "escapeKeyDown");
            }}
            autoFocus={false}
            className={styles.menu_item}
            sx={{
              fontSize: 14,
              ...item.sx,
            }}
            key={item.name}
          >
            {item.icon} {item.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default DropDownMenu;
