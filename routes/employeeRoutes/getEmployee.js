const { db } = require("../../firebase");

const getEmployee = async (req, res) => {
  try {

    const { id } = req.params;

    const doc = await db.collection("employees").doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({
        error: "Employee not found"
      });
    }

    res.status(200).json({
      id: doc.id,
      ...doc.data()
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

module.exports = getEmployee;