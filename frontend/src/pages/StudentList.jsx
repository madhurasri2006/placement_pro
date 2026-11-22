
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);

  const [student, setStudent] = useState({
    name: "",
    registerNumber: "",
    department: "",
    technicalSkills: "",
    aptitudeScore: "",
    communicationSkills: "",
    readinessStatus: "Not Ready",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
       https://placement-pro-backend-a0ne.onrender.com
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);

    setStudent({
      name: item.name,
      registerNumber: item.registerNumber || "",
      department: item.department || "",
      technicalSkills: (item.technicalSkills || []).join(", "),
      aptitudeScore: item.aptitudeScore,
      communicationSkills: item.communicationSkills || "",
      readinessStatus: item.readinessStatus || "Not Ready",
    });
  };

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const studentData = {
        ...student,
        technicalSkills: student.technicalSkills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
        aptitudeScore: Number(student.aptitudeScore),
      };

      await axios.put(
        `http://localhost:5000/students/${editId}`,
        studentData
      );

      alert("Student updated successfully!");

      setEditId(null);
      setStudent({
        name: "",
        registerNumber: "",
        department: "",
        technicalSkills: "",
        aptitudeScore: "",
        communicationSkills: "",
        readinessStatus: "Not Ready",
      });

      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Could not update student.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/students/${id}`
      );

      alert("Student deleted successfully!");
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Could not delete student.");
    }
  };

  return (
    <div>
      <h1>Student Skill List</h1>

      <nav>
        <Link to="/">Home</Link>{" | "}
        <Link to="/add-student">Add Student Skills</Link>{" | "}
        <Link to="/students">Student Skill List</Link>
      </nav>

      {editId && (
        <form onSubmit={handleUpdate}>
          <h2>Edit Student</h2>

          <p>
            <label>Student Name:</label>
            <br />
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label>Register Number:</label>
            <br />
            <input
              type="text"
              name="registerNumber"
              value={student.registerNumber}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label>Department:</label>
            <br />
            <input
              type="text"
              name="department"
              value={student.department}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label>Technical Skills:</label>
            <br />
            <input
              type="text"
              name="technicalSkills"
              value={student.technicalSkills}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label>Aptitude Score:</label>
            <br />
            <input
              type="number"
              name="aptitudeScore"
              min="0"
              max="100"
              value={student.aptitudeScore}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label>Communication Skills:</label>
            <br />
            <select
              name="communicationSkills"
              value={student.communicationSkills}
              onChange={handleChange}
              required
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </p>

          <p>
            <label>Placement Readiness:</label>
            <br />
            <select
              name="readinessStatus"
              value={student.readinessStatus}
              onChange={handleChange}
            >
              <option value="Ready">Ready</option>
              <option value="Not Ready">Not Ready</option>
            </select>
          </p>

          <button type="submit">Update Student</button>{" "}
          <button type="button" onClick={() => setEditId(null)}>
            Cancel
          </button>
        </form>
      )}

      <hr />

      {students.length === 0 ? (
        <p>No student records found. Please add a student.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Register Number</th>
              <th>Department</th>
              <th>Technical Skills</th>
              <th>Aptitude Score</th>
              <th>Communication</th>
              <th>Readiness</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.registerNumber}</td>
                <td>{item.department}</td>
                <td>{(item.technicalSkills || []).join(", ")}</td>
                <td>{item.aptitudeScore}</td>
                <td>{item.communicationSkills}</td>
                <td>{item.readinessStatus}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>
                    Edit
                  </button>{" "}
                  <button onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;
