import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../services/authService";
import { SET_LOGIN, selectName } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/log-in");
  };

  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span>Welcome, </span>
          <span className="--color-danger">{name}</span>
        </h3>
        <button onClick={logout} className="--btn --btn-danger">
          Log Out
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
