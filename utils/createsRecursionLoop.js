const { db } = require("../firebase");

const createsRecursionLoop = async (
  employeeId,
  proposedManagerId
) => {

  // no manager = safe
  if (!proposedManagerId) {
    return false;
  }

  // employee cannot manage themselves
  if (employeeId === proposedManagerId) {
    return true;
  }

  let currentManagerId = proposedManagerId;

  while (currentManagerId) {

    // recursion loop found
    if (currentManagerId === employeeId) {
      return true;
    }

    const managerDoc = await db
      .collection("employees")
      .doc(currentManagerId)
      .get();

    // manager does not exist anymore
    if (!managerDoc.exists) {
      break;
    }

    const managerData = managerDoc.data();

    currentManagerId = managerData.managerId;
  }

  return false;
};

module.exports = createsRecursionLoop;