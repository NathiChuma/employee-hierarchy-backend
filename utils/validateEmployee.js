const { db } = require("../firebase");

const createsRecursionLoop =
  require("./createsRecursionLoop");

const validateEmployee = async (
  employeeData,
  employeeId = null
) => {

  const {
    firstName,
    lastName,
    birthDate,
    employeeNumber,
    salary,
    role,
    managerId,
    email
  } = employeeData;

  // required fields
  if (
    !firstName ||
    !lastName ||
    !birthDate ||
    !employeeNumber ||
    !salary ||
    !role ||
    !email
  ) {
    return "All required fields must be provided.";
  }

  // email validation
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Invalid email address.";
  }

  // salary validation
  if (
    typeof salary !== "number" ||
    salary < 0
  ) {
    return "Salary must be a valid positive number.";
  }

  // employee number uniqueness
  const employeeSnapshot = await db
    .collection("employees")
    .where("employeeNumber", "==", employeeNumber)
    .get();

  const duplicateEmployee =
    employeeSnapshot.docs.find((doc) => {

      // allow current employee during update
      return doc.id !== employeeId;

    });

  if (duplicateEmployee) {
    return "Employee number already exists.";
  }

  // email uniqueness validation
  const emailSnapshot = await db
    .collection("employees")
    .where("email", "==", email)
    .get();

  const duplicateEmail = emailSnapshot.docs.find((doc) => {
    return doc.id !== employeeId; // allow same email on update for same user
  });

  if (duplicateEmail) {
    return "Email already exists.";
  }

  // manager existence validation
  if (managerId) {

    const managerDoc = await db
      .collection("employees")
      .doc(managerId)
      .get();

    if (!managerDoc.exists) {
      return "Selected manager does not exist.";
    }

  }

  // self-management validation
  if (
    employeeId &&
    managerId === employeeId
  ) {
    return "Employee cannot manage themselves.";
  }

  // recursion loop validation
  if (employeeId && managerId) {

    const hasLoop =
      await createsRecursionLoop(
        employeeId,
        managerId
      );

    if (hasLoop) {
      return "Invalid hierarchy structure detected.";
    }

  }

  return null;
};

module.exports = validateEmployee;