import { FC } from "react";

import { IconButton } from "@mui/material";
import { IoTrashOutline } from "react-icons/io5";
import { useStore } from "src/store";
import styles from "./cards.module.scss";

interface IProps {
  data: any;
}

const CartCard: FC<IProps> = ({ data }) => {
  const { handleIncrementDecrement, removeCartItem } = useStore(
    (state: any) => state
  );

  return (
    <div>
      <div className={styles.cart_card}>
        <div className={styles.image}>
          <img src={data?.image} alt="" />
        </div>
        <div className={styles.card_content}>
          <div className={styles.title}>
            <h6>{data?.name}</h6>
            <IconButton onClick={() => removeCartItem(data?.id)}>
              <IoTrashOutline size="18" />
            </IconButton>
          </div>
          <div className={styles.qty_price}>
            <div className={styles.qty}>
              <button onClick={() => handleIncrementDecrement(data, "dec")}>
                -
              </button>
              <span>{data?.count}</span>
              <button onClick={() => handleIncrementDecrement(data, "inc")}>
                +
              </button>
            </div>
            <div className={styles.price}>
              <h5>৳ {data?.price}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
