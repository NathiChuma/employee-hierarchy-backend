const { db } = require("../../firebase");

const getEmployees = async (req, res) => {
  try {

    const snapshot = await db.collection("employees").get();

    const employees = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(employees);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

module.exports = getEmployees;