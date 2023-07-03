import useRedirectLoggedOutUser from "../../customHooks/useRedirectLoggedOut";

const Dashboard = () => {
  useRedirectLoggedOutUser("/log-in");
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};

export default Dashboard;
