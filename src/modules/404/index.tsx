import styles from "./404.module.scss";

const PageNotFound = () => {
  return (
    <div className={styles.not_found}>
      <h1>404</h1>
      <p>Page not found for this url</p>
    </div>
  );
};

export default PageNotFound;
