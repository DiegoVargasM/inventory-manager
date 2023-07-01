const Header = () => {
  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span>Welcome, </span>
          <span className="--color-danger">Diego</span>
        </h3>
        <button className="--btn --btn-danger">Log Out</button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
