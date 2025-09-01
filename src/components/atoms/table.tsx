import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import clsx from "clsx";
import { FC, ReactNode } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import styles from "./atoms.module.scss";

// interface IPropsHeading {
//   children: ReactNode;
//   sortBy?: "asc" | "desc";
// }
interface IPropsTable {
  tableHeadingData: {
    heading: string;
    type?: string;
    sortBy?: "asc" | "desc" | "none";
  }[];
  children: ReactNode;
  onClickSort?: (index: number, type: "asc" | "desc") => void;
}

const CustomTable: FC<IPropsTable> = ({
  tableHeadingData,
  children,
  onClickSort,
}) => {
  return (
    <TableContainer>
      <Table className={styles.table} sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {tableHeadingData?.map((item, index) => (
              <TableCell key={item.heading}>
                <div className={styles.th_wrap}>
                  {item.heading}
                  {item.sortBy ? (
                    <span
                      className={clsx(
                        styles.arrow_wrap,
                        item.sortBy === "asc"
                          ? styles.up
                          : item.sortBy === "desc"
                          ? styles.down
                          : ""
                      )}
                    >
                      <span
                        onClick={() => onClickSort(index, "asc")}
                        className={clsx(
                          styles.icon,
                          item.sortBy === "asc" ? styles.active : ""
                        )}
                      >
                        <FaArrowUp />
                      </span>
                      <span
                        onClick={() => onClickSort(index, "desc")}
                        className={clsx(
                          styles.icon,
                          item.sortBy === "desc" ? styles.active : ""
                        )}
                      >
                        <FaArrowDown />
                      </span>
                    </span>
                  ) : null}
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
