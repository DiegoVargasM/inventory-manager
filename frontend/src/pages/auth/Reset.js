import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";

const Reset = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="lightgrey" />
          </div>
          <h2>Reset Password</h2>
          <form>
            <input
              type="password"
              placeholder="New Password..."
              required
              name="password"
            />
            <input
              type="password"
              placeholder="Confirm New Password..."
              required
              name="password2"
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
            </button>
          </form>
          <span className={styles.register}>
            <Link className="--pad --text-p" to="/">
              Home
            </Link>
            <Link className="--pad --text-p" to="/log-in">
              Log In
            </Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
