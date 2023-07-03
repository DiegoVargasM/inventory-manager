import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { validateEmail, registerUser } from "../../services/authService";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    // validation
    if (!name || !email || !password || !password2) {
      return toast.error("Please fill in all the fields");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    // register user
    const userData = { name, email, password };
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      if (data) {
        setFormData(initialState);
      }
      setIsLoading(false);
      console.log(data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineUserAdd size={35} color="lightgrey" />
          </div>
          <h2>Register</h2>
          <form onSubmit={register}>
            <input
              type="text"
              placeholder="Name..."
              required
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="Email..."
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password..."
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm Password..."
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
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
