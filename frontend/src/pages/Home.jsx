
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="dashboard-container">
      <h1>Placement Dashboard</h1>
      <p>Manage student skills and placement readiness.</p>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Student Details</h3>
          <p>View and manage student information.</p>
          <Link to="/students" className="button">
            View Students
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>Add Student Details</h3>
          <p>Register student skills and scores.</p>
          <Link to="/add-student" className="button">
            Add Student
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>Placement Readiness</h3>
          <p>Track students' preparation progress.</p>
          <Link to="/students" className="button">
            View Skills
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
