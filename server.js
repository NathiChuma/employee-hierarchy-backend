const express = require("express");
const employeeRoutes = require("./routes/employeeRoutes/employeeRoutes");
const cors = require('cors');

const app = express();

app.use(express.json());

// Use the cors middleware
app.use(cors({
    origin: 'https://employee-hierarchy-omega.vercel.app' // Only allow this specific origin
}));

app.use("/employees", employeeRoutes);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});