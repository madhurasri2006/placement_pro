
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function AddStudent() {
  const [student, setStudent] = useState({
    name: "",
    registerNumber: "",
    department: "",
    technicalSkills: "",
    aptitudeScore: "",
    communicationSkills: "",
    readinessStatus: "Not Ready",
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
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

      const response = await axios.post(
        "http://localhost:5000/students",
        studentData
      );

      console.log("Saved student:", response.data);

      alert("Student saved successfully!");

      setStudent({
        name: "",
        registerNumber: "",
        department: "",
        technicalSkills: "",
        aptitudeScore: "",
        communicationSkills: "",
        readinessStatus: "Not Ready",
      });
    } catch (error) {
      console.error(
        "Error saving student:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Could not save student. Please check the backend."
      );
    }
  };

  return (
    <div>
      <h1>Add Student Skills</h1>

      <nav>
        <Link to="/">Home</Link>{" | "}
        <Link to="/add-student">Add Student Skills</Link>{" | "}
        <Link to="/students">Student Skill List</Link>
      </nav>

      <form onSubmit={handleSubmit}>
        <p>
          <label>Student Name:</label>
          <br />
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            placeholder="Enter student name"
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
            placeholder="Enter register number"
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
            placeholder="Enter department"
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
            placeholder="Python, Java, SQL"
            required
          />
        </p>

        <p>
          <label>Aptitude Score (0–100):</label>
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

        <button type="submit">Submit Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
