import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { BiLogIn } from "react-icons/bi";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="lightgrey" />
          </div>
          <h2>Log In</h2>
          <form>
            <input type="email" placeholder="Email..." required name="email" />
            <input
              type="password"
              placeholder="Password..."
              required
              name="password"
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Log In
            </button>
          </form>
          <Link to="/forgot-password" className="--btn hovered">
            Forgot your password? Click here
          </Link>
          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p> Don't have an account? </p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
