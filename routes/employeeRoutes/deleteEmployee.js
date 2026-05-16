const { db } = require("../../firebase");

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employeeRef = db.collection("employees").doc(id);
    const employeeDoc = await employeeRef.get();

    if (!employeeDoc.exists) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const { managerId } = employeeDoc.data();

    // get all direct subordinates of this employee
    const snapshot = await db
      .collection("employees")
      .where("managerId", "==", id)
      .get();

    const batch = db.batch();

    // reassign subordinates to this employee's manager
    snapshot.forEach((doc) => {
      batch.update(doc.ref, {
        managerId: managerId || null, // if no higher manager, they become top-level
      });
    });

    // delete the employee
    batch.delete(employeeRef);

    await batch.commit();

    // fetch fresh employees
    const employeesSnapshot = await db
      .collection("employees")
      .get();

    const employees = employeesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return res.status(200).json({
      message: "Employee deleted and subordinates reassigned successfully",
      employees
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = deleteEmployee;