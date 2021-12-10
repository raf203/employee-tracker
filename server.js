const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = mysql.createConnection(
//acess to database
    {
      host: 'localhost',
      user: 'root',
      password: 'Rafocean230321@',
      database: 'employee_tracker_db'
    },
    console.log('Connected to employee_tracker_db')
);

//error
db.connect(function(err) {
    if (err) throw err;
    promptUser();
  });

// Menu 
function promptUser() {
    return inquirer.prompt([
    {
    type: 'list',
    message: 'Choose an option:',
    name: 'action',
    choices: [
            'view all employees', 
            'view all departments',
            'view all roles',
            'add a department',
            'add a role',
            'add an employee',
            'update the employee role',
            'exit'
            ]
    }
]).then(function(answers) {
        switch (answers.action) {
            case 'view all employees':
                allEmployees();
            break;

            case 'view all departments':
                allDepartments();
            break;

            case 'view all roles':
                allRoles();
            break;

            case 'add departement':
                addDepartment();
            break;

            case 'add role':
                addRole();
            break;

            case 'add employee':
                addEmployee();
            break;

            case 'update employee role':
                updateRole();
            break;

            case 'exit':
                break;    
         }
    })
};

function allEmployees(){
    const sql = `SELECT * FROM employee`
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        promptUser()
      });
}

function allDepartments(){
    const sql = `SELECT * FROM departments`
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        promptUser()
      });
}

function allRoles(){
    const sql = `SELECT * FROM roles`
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        promptUser()
      });
}

function addDepartment(){
    const sql = `SELECT * FROM departments`
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        promptUser()
      });
}

function addEmployee(){

}

function addRole(){

}

function updateRole(){

} 

