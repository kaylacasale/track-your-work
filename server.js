//* npm install --save mysql2
const express = require('express');
const inquirer = require('inquirer')
const cTable = require('console.table');

//* import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//* tried to config connection in separate file config (connection.js) but could not figure out how to export modules correctly without sequalize
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        password: 'iamacoder',
        database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
);

function startPrompt() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'menu',
                message: 'Please select one.',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
            }
        ])
        .then((answer) => {
            switch (answer.menu) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add a department':
                    addADepartment();
                    break
                case 'Add a role':
                    addARole();
                    break
                case 'Add an employee':
                    addAnEmployee();
                    break
                case 'Update an employee role':
                    updateAnEmployeeRole()
                    break
            }
        })
};


//* view all departments 
function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        startPrompt();
    });
}

//* view all roles
function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        startPrompt();
    })
}

//* view all employees
function viewAllEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        startPrompt();
    })
};

//* add a new department (department_name)
function addADepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the department you would like to add?',
                name: 'newDepartment',
            }
        ])
        .then((input) => {
            //  const { newDepartment } = input;
            const params = input.newDepartment;
            db.query(`INSERT INTO department (department_name) VALUES (?);`, params, function (err, results) {

                console.log(`New department ${input.newDepartment} added!`)
                // console.table(results)

                db.query('SELECT * FROM department', function (err, results) {
                    console.table(results)
                    startPrompt();
                })
            })

            // app.post('/api/new-department', (req, res) => {
            //     const sql = `INSERT INTO department (department_name) VALUES (?);`
            //     const params = req.newDepartment;

            //     db.query(sql, params, (err, res) => {
            //         console.log(res)

            //     })


            // app.post('/api/new-department', ({ body }, res) => {
            //     const sql = `INSERT INTO department (department_name) VALUES (?);`
            //     const params = newDepartment;

            //     db.query(sql, params, (err, results) => {
            //         if (err) {
            //             res.status(400).json({ error: err.message });
            //             return;
            //         }
            //         res.json({
            //             message: 'Successfully added new department',
            //             data: body,
            //         })

            //         db.query(`SELECT * FROM departmet`, (err, result) => {
            //             if (err) {
            //                 res.status(500).json({ error: err.message })
            //                 return;
            //             }
            //             console.table(result);
            //             startPrompt();
            //         })
            //     })

            // db.query(`INSERT INTO department (department_name) VALUES ${newDepartment};`, function (err, results) {
            //     console.table(newDepartment);

            //     if (newDepartment) {
            //         db.query(`SELECT * FROM department;`, function (err, results) {
            //             console.table(results)
            //         })
            //     }
            //     startPrompt();
            // })

        })

    // app.get('/api/departments', (req, res) => {
    //     const sql = `SELECT * FROM department`;

    //     db.query(sql, (err, rows) => {
    //         if (err) {
    //             res.status(500).json({ error: err.message });
    //             return;
    //         }
    //         console.table(rows)
    //         res.json({
    //             message: 'success',
    //             data: rows
    //         });

    //     });
    // });

};

//* add a new role (including title, salary, and department_name) to the database
function addARole() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the role you would like to add?',
                name: 'newRoleTitle'
            },
            {
                type: 'input',
                message: 'What is the salary of the role you would like to add?',
                name: 'newRoleSalary'
            },
            {
                type: 'input',
                message: 'What is the department of the role you would like to add?',
                name: 'newRoleDepartment'
            }
        ])
        .then((input) => {
            const params = [input.newRoleTitle, input.newRoleSalary, input.newRoleDepartment];
            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, (SELECT id FROM department WHERE department_name = ?))`, params, function (err, results) {
                console.log(`New role in ${input.newRoleTitle, input.newRoleSalary, input.newRoleDepartment} added to database!`)
                //* to show roles with new role included and department name associated with department's id (through correlation to role's department_id)
                db.query('SELECT * FROM role JOIN department ON role.department_id = department.id;', function (err, results) {
                    console.table(results);
                    startPrompt();
                })
            })


        })
}

//* tried to convert first letter of dpt_name input to upper case in order to accept lowercase values when matching dpt id to dpt name
// ^  // db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, (SELECT id FROM department WHERE department_name = CONCAT(UPPER(SUBSTRING(?,1,1)),LOWER(SUBSTRING(?,2)))`, 

function addAnEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the new employee's first name?",
                name: 'newEmployeeFirstName'
            },
            {
                type: 'input',
                message: "What is the new employee's last name?",
                name: 'newEmployeeLastName'
            },
            {
                type: 'input',
                message: "What is the new employee's role?",
                name: 'newEmployeeRole'
            },
            {
                type: 'input',
                message: "Who is the new employee's manager?",
                name: 'newEmployeeManager'
            }
        ])
        .then((input) => {
            const params = [input.newEmployeeFirstName, input.newEmployeeLastName, input.newEmployeeRole, input.newEmployeeManager];
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?, ?, (SELECT id FROM role WHERE title = ?), (SELECT id FROM employee WHERE first_name = ?))`, params, function (err, results) {
                console.log(`New employee ${input.newEmployeeFirstName} ${input.newEmployeeLastName} added to database!`)

                // db.query(`SELECT CONCAT (e1.first_name, ' ', e1.last_name) AS Employee, e1.role_id AS role_id,
                // CONCAT(e2.first_name, ' ', e2.last_name)
                // AS 'Manager' FROM employee e2
                // INNER JOIN employee e1 ON e1.manager_id = e2.id
                // ORDER BY Employee;`, function (err, results) {
                db.query(`SELECT e1.id AS 'Employee ID', e1.first_name AS 'Employee First Name', e1.last_name AS 'Employee Last Name', e1.role_id AS role_id, e1.manager_id AS ManagerID,
                CONCAT(e2.first_name, ' ', e2.last_name)
                AS 'Manager' FROM employee e2
                LEFT JOIN employee e1 ON e1.manager_id = e2.id
                ORDER BY ManagerID;`, function (err, results) {
                    console.table(results);
                    startPrompt();
                })
            })

        })
}


app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

startPrompt()