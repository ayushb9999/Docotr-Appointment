const Doctor = require("../models/User");

const getAllDoctor = async (req, res) => {
  try {
    const allDoctor = await Doctor.find({ userType: "doctor" }).select(
      "-password"
    );
    if (allDoctor.length === 0) {
      return res.status(404).json({ message: "No doctors found" });
    }
    return res.status(200).json(allDoctor);
  } catch (error) {
    console.error("Error fetching doctors: ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const getDoctorById = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById(id).select("-password");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    return res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor: ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

exports.module = { getAllDoctor, getDoctorById };
