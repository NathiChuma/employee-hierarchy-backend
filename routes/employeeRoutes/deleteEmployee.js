const { db } = require("../../firebase");

const deleteEmployee = async (req, res) => {
  try {

    const { id } = req.params;

    const snapshot = await db
      .collection("employees")
      .where("managerId", "==", id)
      .get();

    const batch = db.batch();

    // remove manager from subordinates
    snapshot.forEach(doc => {
      batch.update(doc.ref, {
        managerId: null
      });
    });

    // delete employee
    batch.delete(
      db.collection("employees").doc(id)
    );

    await batch.commit();

    res.status(200).json({
      message: "Employee deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

module.exports = deleteEmployee;