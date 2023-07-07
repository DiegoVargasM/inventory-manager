import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../services/authService";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      return toast.error("Please fill in all the fields");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    // login user
    const userData = { email, password };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      if (data) {
        setFormData(initialState);
      }
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="lightgrey" />
          </div>
          <h2>Log In</h2>
          <form onSubmit={login}>
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
