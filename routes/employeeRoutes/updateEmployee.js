const { db } = require("../../firebase");

const updateEmployee = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      firstName,
      lastName,
      birthDate,
      employeeNumber,
      salary,
      role,
      managerId,
      email
    } = req.body;

    // prevent employee managing themselves
    if (managerId === id) {
      return res.status(400).json({
        error: "Employee cannot manage themselves"
      });
    }

    await db.collection("employees").doc(id).update({
      firstName,
      lastName,
      birthDate,
      employeeNumber,
      salary,
      role,
      managerId: managerId || null,
      email
    });

    res.status(200).json({
      message: "Employee updated successfully"
    });

  } catch (error) {

    res.status(400).json({
      error: error.message
    });

  }
};

module.exports = updateEmployee;