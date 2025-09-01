import { FC, useState } from "react";
import { toast } from "sonner";
import { useStore } from "src/store";
import styles from "./cards.module.scss";
import clsx from "clsx";

interface IProps {
  data: any;
  handleClick?: () => void;
}

const ProductCard: FC<IProps> = ({ data, handleClick }) => {
  const { handleCartUpdate, isLogin } = useStore((state: any) => state);
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };
  const handleDecrement = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleAddToCart = () => {
    handleCartUpdate(data, count);
    setCount(1);
    toast.success("Added to cart");
  };

  return (
    <div>
      <div className={styles.product}>
        <div className={styles.product_wrapper}>
          <div className={styles.img} onClick={handleClick}>
            <img src={data?.image} alt="" />
          </div>
          <h5>{data?.name}</h5>
          <div className={styles.qty_price}>
            <div className={styles.qty}>
              <button onClick={handleDecrement}>-</button>
              <span>{count}</span>
              <button onClick={handleIncrement}>+</button>
            </div>
            <div className={styles.price}>
              <h4>
                {/* <MdCurrencyRupee /> */}৳ {data?.price}
              </h4>
            </div>
          </div>
          <div className={styles.add_to_cart}>
            <button
              className={clsx(
                isLogin?.business_type === "withdraw" ? styles.disabled : ""
              )}
              onClick={() =>
                isLogin?.business_type !== "withdraw" ? handleAddToCart() : null
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
