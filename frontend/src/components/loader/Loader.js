import loaderImg from "../../assets/loader.gif";
import { createPortal } from "react-dom";
import styles from "./Loader.module.scss";

const Loader = () => {
  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderImg} alt="loader" />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const SpinnerImg = () => {
  return (
    <div className="--center-all">
      <img src={loaderImg} alt="loader" />
    </div>
  );
};

export default Loader;
