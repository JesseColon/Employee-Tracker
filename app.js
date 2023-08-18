const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password1234',
    database: 'EmployeeTracker'
  });

  connection.connect();

  function mainPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit']
        }
    ]).then((answers) => {
        switch (answers.mainMenu) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployeeRole();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    })
  }

    function viewDepartments() {
        connection.query('SELECT * FROM department', function(err, res) {
            if (err) throw err;
            console.table(res);
            mainPrompt();
        })
    }

    function viewRoles() {
        connection.query('SELECT * FROM role', function(err, res) {
            if (err) throw err;
            console.table(res);
            mainPrompt();
        })
    }

    function viewEmployees() {
        connection.query('SELECT * FROM employee', function(err, res) {
            if (err) throw err;
            console.table(res);
            mainPrompt();
        })
    }

    function addDepartment() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the new department?'
            }
        ]).then((answers) => {
            connection.query('INSERT INTO department (name) VALUES (?)', [answers.departmentName], function(err, res) {
                if (err) throw err;
                console.log('Department Added!');
                mainPrompt();
            })
        })
    }

    function addRole() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the new role?'
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'What is the salary of the new role?'
            },
            {
                type: 'input',
                name: 'roleDepartment',
                message: 'What is the department ID of the new role?'
            }
        ]).then((answers) => {
            connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answers.roleName, answers.roleSalary, answers.roleDepartment], function(err, res) {
                if (err) throw err;
                console.log('Role Added!');
                mainPrompt();
            })
        })
    }

    function addEmployee() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'employeeFirstName',
                message: 'What is the first name of the new employee?'
            },
            {
                type: 'input',
                name: 'employeeLastName',
                message: 'What is the last name of the new employee?'
            },
            {
                type: 'input',
                name: 'employeeRole',
                message: 'What is the role ID of the new employee?'
            },
            {
                type: 'input',
                name: 'employeeManager',
                message: 'What is the manager ID of the new employee?'
            }
        ]).then((answers) => {
            connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.employeeManager], function(err, res) {
                if (err) throw err;
                console.log('Employee Added!');
                mainPrompt();
            })
        })
    }

    function updateEmployeeRole() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'employeeId',
                message: 'What is the ID of the employee you would like to update?'
            },
            {
                type: 'input',
                name: 'employeeRole',
                message: 'What is the new role ID of the employee?'
            }
        ]).then((answers) => {
            connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.employeeRole, answers.employeeId], function(err, res) {
                if (err) throw err;
                console.log('Employee Updated!');
                mainPrompt();
            })
        })
    }

    mainPrompt();
    