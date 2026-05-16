# Employee Hierarchy Backend API

Backend API for the Employee Hierarchy Management System built for the EPI-USE Africa technical assessment.

The API manages employee data, reporting structures, hierarchy validation, and communication with Firebase Firestore.

---

# Live Frontend

https://employee-hierarchy-omega.vercel.app

---

# Frontend Repository

https://github.com/NathiChuma/employee-hierarchy

---

# Features

* Create employees
* Retrieve employees
* Update employees
* Delete employees
* Circular hierarchy validation
* Backend data validation
* Firebase Firestore integration
* REST API architecture

---

# Tech Stack

* Node.js
* Express.js
* Firebase Firestore
* Firebase Admin SDK

---

# Project Structure

```txt id="dbaw8j"
src
│
├── routes
    |── employeeRoutes
├── utils
├── firebase.js
├── app.js
└── server.js
```

---

# Installation

## Clone Repository

```bash id="7bwwn9"
git clone https://github.com/NathiChuma/employee-hierarchy-backend.git
```

---

# Install Dependencies

```bash id="3j8i0y"
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory:

```env id="z64z0f"
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
PORT=3000
```

---

# Running the Server

## Development

```bash id="tuzh67"
npm run dev
```

## Production

```bash id="0y0s5g"
npm start
```

---

# API Endpoints

| Method | Endpoint                      | Description            |
| ------ | ----------------------------- | ---------------------- |
| GET    | /employees/getEmployees       | Retrieve all employees |
| POST   | /employees/createEmployee     | Create employee        |
| PUT    | /employees/updateEmployee/:id | Update employee        |
| DELETE | /employees/deleteEmployee/:id | Delete employee        |

---

# Employee Data Structure

```json id="v4kj35"
{
  "firstName": "Michael",
  "lastName": "Chen",
  "birthDate": "1988-07-22",
  "employeeNumber": "EMP002",
  "salary": 120000,
  "role": "CTO",
  "managerId": "employeeDocId",
  "email": "michael.chen@epiuse.com"
}
```
---

# Future Improvements

* Authentication and authorization
* Role-based permissions
* Rate limiting

---

# Author

Nkosinathi Chuma