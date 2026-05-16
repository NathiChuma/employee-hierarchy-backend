const { db } = require("../../firebase");
const validateEmployee = require("../../utils/validateEmployee");

const createEmployee = async (req, res) => {  
  try {

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

    const employeeRef = db.collection("employees").doc();

    const employeeData = {
      firstName,
      lastName,
      birthDate,
      employeeNumber,
      salary,
      role,
      managerId: managerId || null,
      email
    };

    const validationError = await validateEmployee(employeeData);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    await employeeRef.set(employeeData);

    res.status(201).json({
      message: "Employee created successfully",
      employee: {
        id: employeeRef.id,
        ...employeeData
      }
    });

  } catch (error) {

    res.status(400).json({
      error: error.message
    });

  }
};

module.exports = createEmployee;