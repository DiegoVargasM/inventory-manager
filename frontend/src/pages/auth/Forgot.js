import { useState } from "react";
import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import { forgotPassword, validateEmail } from "../../services/authService";
import { toast } from "react-toastify";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter your email");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    // send reset email
    const userData = { email };
    await forgotPassword(userData);
    setEmail("");
  };
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="lightgrey" />
          </div>
          <h2>Forgot Password</h2>
          <form onSubmit={forgot}>
            <input
              type="email"
              placeholder="Email..."
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
