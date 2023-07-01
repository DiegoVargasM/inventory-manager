import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineUserAdd size={35} color="lightgrey" />
          </div>
          <h2>Register</h2>
          <form>
            <input type="text" placeholder="Name..." required name="name" />
            <input type="email" placeholder="Email..." required name="email" />
            <input
              type="password"
              placeholder="Password..."
              required
              name="password"
            />
            <input
              type="password"
              placeholder="Confirm Password..."
              required
              name="passwordConfirm"
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>
          <Link to="/forgot-password" className="--btn hovered">
            Forgot your password? Click here
          </Link>
          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p> Have an account? </p>
            <Link to="/log-in">Log In</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
