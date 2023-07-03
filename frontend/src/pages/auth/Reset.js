import { useState } from "react";
import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { MdPassword } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/authService";

const initialState = {
  password: "",
  password2: "",
};

const Reset = () => {
  const [formData, setformData] = useState(initialState);
  const { password, password2 } = formData;

  const { resetToken } = useParams();

  const handleInputChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const reset = async (e) => {
    e.preventDefault();
    // validation
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    // reset password
    const userData = {
      password,
      password2,
    };

    try {
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="lightgrey" />
          </div>
          <h2>Reset Password</h2>
          <form onSubmit={reset}>
            <input
              type="password"
              placeholder="New Password..."
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm New Password..."
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
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
