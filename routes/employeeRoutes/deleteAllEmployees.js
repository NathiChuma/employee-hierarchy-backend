const { db } = require("../../firebase");

const deleteAllEmployees = async (req, res) => {

  try {

    const snapshot = await db
      .collection("employees")
      .get();

    if (snapshot.empty) {
      return res.status(200).json({
        message: "No employees found"
      });
    }

    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    res.status(200).json({
      message: "All employees deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

module.exports = deleteAllEmployees;