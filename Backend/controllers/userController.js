const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.find({}).select("-password -__v");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  {
    try {
      const user = await User.findById(req.params.id).select("-password -__v");
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
