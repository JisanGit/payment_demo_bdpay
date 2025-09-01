import { Container } from "@mui/material";
import ProductCard from "src/components/cards/product";
import DemoLayout from "src/layouts/demoLayout";
import styles from "./home.module.scss";

const HomePage = () => {
  const products = [
    {
      id: 1,
      name: "T-Shirt 1",
      price: 100,
      image: "/images/products/product1.webp",
      description: "",
      quantity: 10,
    },
    {
      id: 2,
      name: "T-Shirt 2",
      price: 79,
      image: "/images/products/product2.webp",
      quantity: 5,
    },
    {
      id: 3,
      name: "T-Shirt 3",
      price: 99,
      image: "/images/products/product3.webp",
      quantity: 8,
    },
    {
      id: 4,
      name: "T-Shirt 4",
      price: 69,
      image: "/images/products/product4.webp",
      quantity: 12,
    },
    {
      id: 5,
      name: "T-Shirt 5",
      price: 39,
      image: "/images/products/product5.webp",
      description: "",
      quantity: 10,
    },
    {
      id: 6,
      name: "T-Shirt 2",
      price: 79,
      image: "/images/products/product6.webp",
      quantity: 5,
    },
    {
      id: 7,
      name: "T-Shirt 7",
      price: 110,
      image: "/images/products/product7.webp",
      quantity: 8,
    },
    {
      id: 8,
      name: "T-Shirt 8",
      price: 120,
      image: "/images/products/product8.webp",
      quantity: 12,
    },
  ];

  return (
    <DemoLayout>
      <div className={styles.page}>
        <div className={styles.banner}>
          <Container>
            <div className={styles.banner_wrap}>
              <div className={styles.banner_content}>
                <h1>
                  ABC T-shirt
                  <br /> payment demo
                </h1>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut
                  saepe fuga ad atque corporis harum dolorum incidunt eveniet
                  illo! Vel voluptas error, repudiandae soluta fugit pariatur
                  quod nulla aspernatur porro?
                </p>
              </div>
              <div className={styles.banner_img}>
                <img src="/images/banner.png" alt="" />
              </div>
            </div>
          </Container>
        </div>
        <section className={styles.products}>
          <Container>
            <div className={styles.heading}>
              <h2>Buy now</h2>
            </div>

            <div className={styles.product_list}>
              {products?.map((item: any) => (
                <ProductCard data={item} key={item.id} />
              ))}
              {/* {products?.map((item) => (
                <div className={styles.product_col} key={item.id}>
                  <div className={styles.product}>
                    <div className={styles.image}>
                      <img src={item.image} alt="" />
                    </div>
                    <div className={styles.product_content}>
                      <h5>{item.name}</h5>
                      <h3>{item.price}</h3>
                      <div className={styles.price_btn}>
                        <CustomButton>Add to cart</CustomButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))} */}
            </div>
          </Container>
        </section>
      </div>
    </DemoLayout>
  );
};

export default HomePage;
