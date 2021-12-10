const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Rafocean230321@',
      database: 'employee_tracker_db'
    },
    console.log('Connected to employee_tracker_db')
);