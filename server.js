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
            'View all employees', 
            'View all departments',
            'View all roles',
            'Add an employee',
            'Add a department',
            'Add a role',
            'Update the employee role',
            'Update the employee manager',
            'Delete an employee',
            'Delete a department',
            'Delete a role',
            'View employees by department',
            'View the total budget of a department',
            'Exit'
            ]
    }
]).then(function(answers) {
        switch (answers.action) {
            case 'View all employees':
                allEmployees();
            break;

            case 'View all departments':
                allDepartments();
            break;

            case 'View all roles':
                allRoles();
            break;

            case 'Add a department':
                addDepartment();
            break;

            case 'Add a role':
                addRole();
            break;

            case 'Add an employee':
                addEmployee();
            break;

            case 'Update the employee role':
                updateRole();
            break;

            case 'Update the employee manager':
                updateManager();
            break;

            case 'Delete an employee':
                deleteEmployee();
            break;

            case 'Delete a department':
                deleteDepartment();
            break;

            case 'Delete a role':
                deleteRole();
            break;

            case 'View employees by department':
                viewByDepartment();
            break;

            case 'View the total budget of a department':
                viewBudget();
            break;

            case 'Exit':
                db.end();
                break;    
         }
    })
};

// Show all employees
function allEmployees(){
    const sql = `SELECT * FROM employee`
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        promptUser()
      });
}

// Show all departments
function allDepartments(){
    const sql = `SELECT * FROM departments`
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        promptUser()
      });
}

// Show all roles
function allRoles(){
    const sql = `SELECT * FROM roles`
    db.query(sql, (err, res) => {
        if (err) throw err
        console.table(res)
        promptUser()
      });
}


// Add Employee
function addEmployee(){
    return inquirer.prompt([
        {
          name: 'firstname',
          type: 'input',
          message: 'Add the first name of the employee.'
        },
        {
            name: 'lastname',
            type: 'input',
            message: 'Add the last name of the employee.'
        },
        {
            name: 'roleid',
            type: 'input',
            message: 'Add the role ID of the employee.'
        },
        {
            name: 'managerid',
            type: 'input',
            message: 'Add the manager ID of the employee.'
        }

    ]).then(answers => {
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
            const params = [answers.firstname, answers.lastname, answers.roleid, answers.managerid]
            db.query(sql, params, (err, res) => {
                if (err) throw err 
                console.log("--------");
                console.log("Success!");
                console.log("--------");
                promptUser();
            }
        )
    })
}

// Add Department
function addDepartment(){
    return inquirer.prompt([
        {
          name: 'name',
          type: 'input',
          message: 'Add the department name.'
        },
        {
            name: 'id',
            type: 'input',
            message: 'Add the department ID.'
        }

    ]).then(answers => {
            const sql = `INSERT INTO departments (id, name) VALUES (?,?)`; //query
            const params = [answers.id, answers.name]
            db.query(sql, params, (err, res) => {
                if (err) throw err 
                console.log("--------");
                console.log("Success!");
                console.log("--------");
                promptUser();
            }
        )
    })
}


// Add Role
function addRole(){
    return inquirer.prompt([
        {
          name: 'title',
          type: 'input',
          message: 'Add a role.'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Add the salary of this role.'
        },
        {
            name: 'departmentid',
            type: 'input',
            message: 'Add the department ID of this role.'
        }

    ]).then(answers => {
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
            const params = [answers.title, answers.salary, answers.departmentid]
            db.query(sql, params, (err, res) => {
                if (err) throw err 
                console.log("--------");
                console.log("Success!");
                console.log("--------");
                promptUser();
            }
        )
    })
}

// Update role
function updateRole(){

   const sql = `SELECT * FROM employee`;
   db.query(sql, (err, res) => {
       if (err) throw err
       const employee = res.map(({ id, first_name, last_name }) => ({
        value: id,
        name: `${first_name} ${last_name}`,
      }));
            return inquirer.prompt([
            {
                name: 'title',
                type: 'list',
                message: 'Choose an employee to update the role',
                choices: employee
            },
        ]).then(answers => {
            const sql = `SELECT * FROM roles`;
            db.query(sql, (err, res) => {
                if (err) throw err
                    const role = res.map(({ id, title, salary }) => ({
                    value: id,
                    title: `${title}`,
                    salary: `${salary}`,
                    name: `${title}`,
                }));
                return inquirer.prompt([
                    {
                    type: 'list',
                    name: 'role',
                    message: 'Choose the new role.',
                    choices: role,
                    }
                ]).then(ans =>{
                        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
                        const params = [ans.role, answers.title]

                        db.query(sql, params, (err, res) => {
                          if (err) throw err;
                          console.log("--------");
                          console.log("Success!");
                          console.log("--------");
                          promptUser();
                        });
                })
            })
        })
    }
)}

// Update Manager
function updateManager(){
    const sql = `SELECT * FROM employee ORDER BY last_name`;
    db.query(sql, (err, res) => {
        if (err) throw err
        const employee = res.map(({ id, first_name, last_name }) => ({
         value: id,
         name: `${first_name} ${last_name}`,
       }));
             return inquirer.prompt([
             {
                 name: 'title',
                 type: 'list',
                 message: 'Choose the employee to update the manager.',
                 choices: employee
             },
         ]).then(answers => {
             const sql = `SELECT * FROM employee`;
             db.query(sql, (err, res) => {
                 if (err) throw err
                     const manager = res.map(({ id, first_name, last_name }) => ({
                        value: id,
                        name: `${first_name} ${last_name}`,
                 }));
                 return inquirer.prompt([
                     {
                     type: 'list',
                     name: 'manager',
                     message: 'Choose the manager.',
                     choices: manager,
                     }
                 ]).then(answer =>{
                         const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
                         const params = [answer.manager, answers.title]
                         db.query(sql, params, (err, res) => {
                           if (err) throw err;
                           console.log("--------");
                           console.log("Success!");
                           console.log("--------");
                           promptUser();
                         });
                 })
             })
         })
    })
}

// Delete employee
function deleteEmployee(){
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, res) => {
        if (err) throw err
        const employee = res.map(({ id, first_name, last_name }) => ({
            value: id,
            name: `${first_name} ${last_name}`,
        }));
        return inquirer.prompt([
            {
            type: 'list',
            name: 'employee',
            message: 'Choose an employee to delete.',
            choices: employee,
            }
        ]).then(answer =>{
                const sql = `DELETE FROM employee WHERE id = ?`;
                const params = [answer.employee]
                db.query(sql, params, (err, res) => {
                  if (err) throw err;
                  console.log("--------");
                  console.log("Success!");
                  console.log("--------");
                  promptUser();
                });
        })
    })
}

// Delete department
function deleteDepartment(){
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, res) => {
        if (err) throw err
            const departement = res.map(({ id, name }) => ({
            value: id,
            name: `${name}`,
        }));
        return inquirer.prompt([
            {
            type: 'list',
            name: 'department',
            message: 'Choose a department to delete.',
            choices: departement,
            }
        ]).then(answer =>{
                const sql = `DELETE FROM departments WHERE id = ?`;
                const params = [answer.department]
                db.query(sql, params, (err, res) => {
                  if (err) throw err;
                  console.log("--------");
                  console.log("Success!");
                  console.log("--------");
                  promptUser();
                });
        })
    })
}

// Delete Role
function deleteRole(){
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, res) => {
        if (err) throw err
            const role = res.map(({ id, title, salary }) => ({
            value: id,
            title: `${title}`,
            salary: `${salary}`,
            name: `${title}`,
        }));
        return inquirer.prompt([
            {
            type: 'list',
            name: 'role',
            message: 'Choose a role to delete.',
            choices: role,
            }
        ]).then(answer =>{
                const sql = `DELETE FROM roles WHERE id = ?`;
                const params = [answer.role]
                db.query(sql, params, (err, res) => {
                  if (err) throw err;
                  console.log("--------");
                  console.log("Success!");
                  console.log("--------");
                  promptUser();
                });
        })
    })
}

// View employees by department
function viewByDepartment(){
    const sql = `SELECT employee.first_name, employee.last_name, departments.id as department_id, departments.name as department_name FROM employee 
    LEFT JOIN roles ON employee.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id  ORDER BY department_id;`;
    db.query(sql, (err, res) => {
      if (err) throw err;
      console.table(res);
      promptUser();
    });
}

// View total budget of department
function viewBudget(){
    const sql = `SELECT departments.id, departments.name, SUM(roles.salary) AS total FROM employee 
    LEFT JOIN roles ON employee.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    GROUP BY departments.id, departments.name ORDER BY departments.id`
     db.query(sql, (err, res) => {
              if (err) throw err;
              console.table(res);
              promptUser();
            });            
}