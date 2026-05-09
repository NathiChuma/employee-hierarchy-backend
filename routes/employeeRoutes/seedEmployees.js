const { db } = require("../../firebase");
const employees = require("../data/employees.json");

const seedEmployees = async (req, res) => {
  try {

    const idMap = {};

    // FIRST PASS:
    // create employees and store id mappings

    for (const employee of employees) {

      const employeeRef = db.collection("employees").doc();

      idMap[employee.id] = employeeRef.id;

      await employeeRef.set({
        firstName: employee.firstName,
        lastName: employee.lastName,
        birthDate: employee.birthDate,
        employeeNumber: employee.employeeNumber,
        salary: employee.salary,
        role: employee.role,
        managerId: null,
        email: employee.email
      });

    }

    // SECOND PASS:
    // update managerIds

    for (const employee of employees) {

      const firestoreId = idMap[employee.id];

      let updatedManagerId = null;

      if (employee.managerId) {
        updatedManagerId =
          idMap[employee.managerId];
      }

      await db
        .collection("employees")
        .doc(firestoreId)
        .update({
          managerId: updatedManagerId
        });

    }

    res.status(200).json({
      message: "Employees seeded successfully",
      idMap
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

module.exports = seedEmployees;