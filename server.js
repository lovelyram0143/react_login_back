const express = require("express");

const sql = require("mssql/msnodesqlv8");
const { hostname } = require("os");

const app = express();
const server=require('http').createServer(app);
server.listen(port, hostname() => {
    console.log('started');
});

// SQL Server configuration
var config = {
    
    server: "(localdb)\\MSSQLLocalDB  ", // Server IP address
    database: "Demodatabase", // Database name
    options: {
        encrypt: false, // Disable encryption
        trustedConnection: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    }
}

// Connect to SQL Server
sql.connect(config, err => {
    if (err) {
        console.log(err)
        throw err;
    }
    console.log("Connection Successful!");
});

// Define route for fetching data from SQL Server
app.get("/student/", (_request, response) => {
    // Execute a SELECT query
    new sql.Request().query("SELECT * FROM students", (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
        } else {
            response.send(result.recordset); // Send query result as response
            console.dir(result.recordset);
        }
    });
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Listening on port 3000...");
});