import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";

const Forgot = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="lightgrey" />
          </div>
          <h2>Reset Password</h2>
          <form>
            <input type="email" placeholder="Email..." required name="email" />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Get Reset Email
            </button>
          </form>
          <span className={styles.register}>
            <Link className="--pad --text-p" to="/">
              Home
            </Link>
            <Link className="--pad --text-p" to="/log-in">
              Log In
            </Link>
            <Link className="--pad --text-p" to="/register">
              Register
            </Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Forgot;
