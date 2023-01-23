//* 'npm init -y'
//* 'npm i inquirer@8.2.4
//* 'npm i mysql2'
//* npm install console.table (https://www.npmjs.com/package/console.table)
//* npm install --save mysql2

//* require express package
//* bind the application middleware to an instance of the app object by using 'app.use()' and 'app.METHOD()' functions, where METHOD is the HTTP method of the request that te middleware function handles (such as GET, PUT, POST, or DELETE)
const express = require('express');
const inquirer = require('inquirer')
const cTable = require('console.table');

//* import and require mysql2
const mysql = require('mysql2');
//const Connection = require('mysql2/typings/mysql/lib/Connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//* connect to employee_tracker_db 
// tried to config connection in separate file config (connection.js) but could not figure out how to export modules correctly without sequalize
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
//* prompt is initiated upon starting application (called in later code below)
//* use switch statement to redirect to different functions based on user input to view, insert, update, or delete table values
function startPrompt() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'menu',
                message: 'Please select one.',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Update an employee manager', 'View employee by manager', 'View employee by department', 'Delete a department']
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
                case 'Update an employee manager':
                    updateAnEmployeeManager()
                    break
                case 'View employee by manager':
                    viewEmployeeByManager()
                    break
                case 'View employee by department':
                    viewEmployeeByDepartment()
                    break
                case 'Delete a department':
                    deleteDepartment()
                    break
            }
        })
};

//* query database
//* view all departments 
function viewAllDepartments() {
    db.query('SELECT department.id AS id, department.department_name AS Department FROM department;', function (err, results) {
        console.table(results);
        startPrompt();
    });
}

//* view all roles
function viewAllRoles() {
    db.query(`SELECT role.title AS 'Job Title', role.id AS 'Role id', department.department_name AS Department, role.salary AS Salary FROM role INNER JOIN department ON role.department_id = department.id;`, function (err, results) {
        console.table(results);
        startPrompt();
    })
}

//* view all employees
function viewAllEmployees() {
    db.query(`SELECT employee.id AS 'Employee ID', 
    CONCAT (employee.first_name, ' ', employee.last_name) AS Name, 
    role.title AS 'Job Title' ,
    department.department_name AS 'Department',
    role.salary AS 'Salary',
    CONCAT (manager.first_name, ' ', manager.last_name) AS 'Manager'
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id;`, function (err, results) {
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

                viewAllDepartments()

                // db.query('SELECT * FROM department', function (err, results) {
                //     console.table(results)
                //     startPrompt();
                // })
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
// function addARole() {
//     const choices = []
//     function departmentChoices() {

//         db.query(`SELECT department_name, id FROM department`, function (err, results) {
//             const departments = results.map(({ department_name, id }) => ({ name: department_name, value: id }));
//             console.log(departments)
//             //console.log(name)
//             choices.push(departments.name)
//             departments.forEach(function (item, index) {
//                 choices.push(item.name)
//                 console.log(choices)
//                 return choices
//             })
//             // results.forEach(choice => {
//             //     let department = {
//             //         name: choice.name,
//             //         value: choice.id,
//             //     }
//             //     choices.push(department);

//             // })
//             // console.log(choices)
//             // departments.name.forEach(choice => {
//             //     choices.push(choice)
//             //     console.log(choices)
//             //     return choices



//         });


//     }
//* add a new role to the db (input values include title (any), salary (any), and department_name (from existing list))
function addARole() {
    db.query(`SELECT department_name, id FROM department`, function (err, results) {
        //* map through array of current departments in database to list as choices for new department prompt
        const departments = results.map(({ department_name, id }) => ({ name: department_name, value: id }));

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
                    type: 'list',
                    message: 'What is the department of the role you would like to add?',
                    name: 'newRoleDepartment',
                    choices: departments,
                }
            ])
            .then((input) => {
                const params = [input.newRoleTitle, input.newRoleSalary, input.newRoleDepartment];
                db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, params, function (err, results) {
                    console.log(`New role in ${input.newRoleDepartment} added to database!`)
                    //* to show roles with new role included and department name associated with department's id (through correlation to role's department_id)

                    viewAllRoles()
                    // db.query('SELECT * FROM role JOIN department ON role.department_id = department.id;', function (err, results) {
                    //     console.table(results);
                    //     startPrompt();
                    // })
                })


            })
    })
}

//* tried to convert first letter of dpt_name input to upper case in order to accept lowercase values when matching dpt id to dpt name
// ^  // db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, (SELECT id FROM department WHERE department_name = CONCAT(UPPER(SUBSTRING(?,1,1)),LOWER(SUBSTRING(?,2)))`, 
// const getAllEmployees = () => {
//     db.query('SELECT * FROM EMPLOYEE', (err, results) => {
//         if (err) throw err;
//         const managerChoices = [
//             {
//                 name: 'N/A',
//                 value: 0
//             }
//         ]
//         results.forEach(({ first_name, las }))
//     })
// }
// const managerArr = []
// function seeManagers() {
//     db.query(`SELECT employee.id, 
//         CONCAT (employee.first_name, ' ', employee.last_name) AS manager_name
//         FROM employee
//         WHERE employee.manager_id = employee.id;
//         `, function (err, results) {
//         let managers = results.map(({ manager_name, id }) => ({ name: manager_name, value: id }))
//         // managerArr.push(managers)
//         // return managerArr
//         for (var i = 0; i < managers.length; i++) {
//             const managerName = managers[i].name
//             console.log(managerName)
//             managerArr.push(managerName)

//         }

//         console.log(managerArr)





//         inquirer
//             .prompt([
//                 {
//                     type: 'list',
//                     name: 'seeMans',
//                     message: 'choose a manager',
//                     choices: function () {
//                         let managers = results.map(({ manager_name, id }) => ({ name: manager_name, value: id }))
//                         managerArr.push(managers)
//                         return managerArr

//                     }

//                 }
//             ])
//     })
// }
//console.log(managerArr)

//seeManagers()

//* add a new employee to the db
function addAnEmployee() {

    //get all the employee list to make choice of employee's manager
    // db.query(`SELECT * FROM role;
    // SELECT CONCAT (e.first_name," ",e.last_name) AS full_name FROM employee e;`, (err, emplRes) => {
    //     if (err) throw err;
    //     const employeeChoice = [
    //         {
    //             name: 'None',
    //             value: 0
    //         }
    //     ]; //an employee could have no manager
    //     emplRes.forEach(({ first_name, last_name, id }) => {
    //         employeeChoice.push({
    //             name: first_name + " " + last_name,
    //             value: id
    //         });
    //     });
    // map through current roles in database to get role choices for add employee prompt
    // db.query(`SELECT role.id, role.title FROM role`, function (err, results) {
    //     const roles = results.map(({ title, id }) => ({ name: title, value: id }));
    //* look through list of existing roles, push into roleChoice array, and display as list values in prompt to choose new employee role
    db.query(`SELECT * FROM role`, (err, results) => {
        if (err) throw err;
        const roleChoice = [];

        results.forEach(({ title, id }) => {
            roleChoice.push({
                name: title,
                value: id
            });
        });

        //* look through list of existing managers, push into managerChoice array, and display as list values in prompt to choose new employee manager
        db.query("SELECT * FROM employee", (err, results) => {
            if (err) throw err;


            const managerChoice = [{
                name: 'None',
                value: 0
            }]; //choice that an employee could have no manager
            results.forEach(({ first_name, last_name, id }) => {
                managerChoice.push({
                    name: first_name + " " + last_name,
                    value: id
                });
            });


            // const managerArr = []
            // db.query(`SELECT employee.id, 
            // CONCAT (employee.first_name, ' ', employee.last_name) AS manager_name
            // FROM employee
            // WHERE employee.manager_id = employee.id;
            // `, function (err, results) {
            //     let managers = results.map(({ manager_name, id }) => ({ name: manager_name, value: id }))
            //     // managerArr.push(managers)
            //     // return managerArr

            //     for (var i = 0; i < managers.length; i++) {
            //         const managerName = managers[i].name
            //         console.log(managerName)
            //         managerArr.push(managerName)

            //     }
            // seeManagers()
            // db.query(`SELECT employee.id, 
            // CONCAT (employee.first_name, ' ', employee.last_name) AS manager
            // FROM employee
            // WHERE employee.manager_id = employee.id;`, function (err, results) {
            //     // const managerNames = CONCAT(results.first_name + results.last_name)
            //     const managers = results.map(({ manager, id }) => ({ name: manager, value: id }))
            //     console.log(managers)
            // })

            // db.query(`SELECT employee.id, employee.first_name, employee.last_name FROM employee`, function (err, results) {
            //     const managers = results.map(({ first_name, last_name, id }) => ({ name: first_name + ' ' + last_name, value: id }))
            // })

            // db.query(`SELECT employee.id, employee.manager_id FROM employee`, function (err, results) {
            //     const managers = results.map(({ manager_id, id }) => ({ name: manager_id, value: id }))
            // })
            //managerArr = []
            // db.query(`SELECT employee.manager_id, employee.id FROM employee`, function (err, results) {
            //     // const managers = results.map(({ first_name, manager_id }) => ({ name: first_name, value: manager_id }));
            //     // console.log(managers)
            //     for (i = 0; i < results.length; i++) {
            //         // const id = results.manager_id
            //         // managerArr.push(id)
            //         const arr = results[i].manager_id;
            //         //  console.log(arr)
            //         managerArr.push(arr)
            //         return managerArr
            //         //console.log(managerArr)
            //     }
            //     console.log(managerArr)
            // })

            // db.query('SELECT * FROM employee', (err, results) => {
            // db.query(`SELECT employee.id, 
            //     CONCAT (employee.first_name, ' ', employee.last_name) AS manager_name
            //     FROM employee
            //     WHERE employee.manager_id = employee.id;
            //     `, function (err, results) {
            //     let managers = results.map(({ manager_name, id }) => ({ name: manager_name, value: id }))
            //     //let managerArray = results.map(choice => choice.full_name);
            //     console.log(managers)
            // })

            // managerChoice = [
            //     {
            //         name: 'None',
            //         value: 0
            //     }
            // ];
            //     const managerChoice = [];
            //     results.forEach(({ first_name, last_name, id }) => {
            //         managerChoice.push({
            //             name: first_name + " " + last_name,
            //             value: id
            //         });
            //         return managerChoice
            //     });

            // })
            // function seeManagers() {
            //     db.query(`SELECT employee.id, 
            //     CONCAT (employee.first_name, ' ', employee.last_name) AS manager_name
            //     FROM employee
            //     WHERE employee.manager_id = employee.id;
            //     `, function (err, results) {

            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: "What is the new employee's first name?",
                        name: 'first_name'
                    },
                    {
                        type: 'input',
                        message: "What is the new employee's last name?",
                        name: 'last_name'
                    },
                    {
                        type: 'list',
                        message: "What is the new employee's role?",
                        name: 'role_id',
                        choices: roleChoice,
                    },
                    {
                        // type: 'list',
                        // message: "Who is the new employee's manager?",
                        // name: 'newEmployeeManager',
                        // choices:   
                        name: 'manager_id',
                        type: 'list',
                        choices: managerChoice,
                        message: "Who is the new employee's manager?"

                    }
                ])

                .then((input) => {

                    const params = [input.first_name, input.last_name, input.role_id, input.manager_id];
                    // db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?, ?, (SELECT id FROM role WHERE title = ?), (SELECT id FROM employee WHERE manager_id = ?))`, params, function (err, results) {
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, params, function (err, results) {
                        console.log(`New employee ${input.first_name} ${input.last_name} added to database!`)
                        viewAllEmployees();
                    })

                    //     db.query("SELECT * FROM employee", (err, results) => {
                    //         if (err) throw err;
                    //         const employeeChoice = [];
                    //         results.forEach(({ first_name, last_name, id }) => {
                    //             employeeChoice.push({
                    //                 name: first_name + " " + last_name,
                    //                 value: id
                    //             });
                    //         });

                })
        })
        // db.query(`SELECT CONCAT (e1.first_name, ' ', e1.last_name) AS Employee, e1.role_id AS role_id,
        // CONCAT(e2.first_name, ' ', e2.last_name)
        // AS 'Manager' FROM employee e2
        // INNER JOIN employee e1 ON e1.manager_id = e2.id
        // ORDER BY Employee;`, function (err, results) {
        // db.query(`SELECT e1.id AS 'Employee ID', e1.first_name AS 'Employee First Name', e1.last_name AS 'Employee Last Name', e1.role_id AS role_id, e1.manager_id AS ManagerID,
        //     CONCAT(e2.first_name, ' ', e2.last_name)
        //     AS 'Manager' FROM employee e2
        //     LEFT JOIN employee e1 ON e1.manager_id = e2.id
        //     ORDER BY ManagerID;`, function (err, results) {
        //     console.table(results);
        //     startPrompt();
        // })
    })



}


// function roles() {
//     db.query(`SELECT role.id, role.title FROM role`, function (err, results) {
//         const roles = results.map(({ id, title }) => ({ name: title, value: id }));
//         console.log(roles)
//         // return roles
//         roleChoices.push(roles);
//         return roleChoices;

//     });

// }

// const roleChoices = [];
//* update an existing employee's role title value
const updateAnEmployeeRole = () => {
    //get all the employee list 
    db.query("SELECT * FROM employee", (err, results) => {
        if (err) throw err;
        const employeeChoice = [];
        results.forEach(({ first_name, last_name, id }) => {
            employeeChoice.push({
                name: first_name + " " + last_name,
                value: id
            });
        });

        db.query('SELECT * FROM role', (err, results) => {
            if (err) throw err;

            const roleChoice = [{
                name: 'None',
                value: 0
            }]; //an employee could have no manager
            results.forEach(({ title, id }) => {
                roleChoice.push({
                    name: title,
                    value: id
                });
            });


            let questions = [
                {
                    type: "list",
                    name: "id",
                    choices: employeeChoice,
                    message: "Which employee would you like to update?"
                },
                {
                    type: "list",
                    name: "role_id",
                    choices: roleChoice,
                    message: "What is the employee's new role?"
                }
            ]

            inquirer.prompt(questions)
                .then(response => {
                    const query = `UPDATE employee SET ? WHERE role_id = ?;`;
                    let role_id = response.role_id !== 0 ? response.role_id : null;
                    db.query(query, [
                        { role_id: role_id },
                        response.id
                    ], (err, res) => {
                        if (err) throw err;

                        console.log(`The employee's role has been successfully updated!`);
                        seeEmployeesAndRoles();

                    });

                })
                .catch(err => {
                    console.error(err);
                });
        })
    });


};

//* see employee id, name, role title, department, salary and manager after adding new employee
function seeEmployeesAndRoles() {
    db.query(`
    SELECT employee.id AS 'Employee ID', 
CONCAT (employee.first_name, ' ', employee.last_name) AS Name, 
role.title AS 'Job Title' ,
department.department_name AS 'Department',
role.salary AS 'Salary',
CONCAT (manager.first_name, ' ', manager.last_name) AS 'Manager'
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id;`, function (err, results) {
        console.table(results)
        startPrompt();
    })
}

//* update employee manager
const updateAnEmployeeManager = () => {
    //* get all employees to insert into employeeChoice list array
    db.query("SELECT * FROM employee", (err, results) => {
        if (err) throw err;
        const employeeChoice = [];
        results.forEach(({ first_name, last_name, id }) => {
            employeeChoice.push({
                name: first_name + " " + last_name,
                value: id
            });
        });
        //* get all managers to insert into managerChoice list array
        const managerChoice = [{
            name: 'None',
            value: 0
        }]; //an employee could have no manager
        results.forEach(({ first_name, last_name, id }) => {
            managerChoice.push({
                name: first_name + " " + last_name,
                value: id
            });
        });

        let questions = [
            {
                type: "list",
                name: "id",
                choices: employeeChoice,
                message: "who do you want to update?"
            },
            {
                type: "list",
                name: "manager_id",
                choices: managerChoice,
                message: "whos is the employee's new manager?"
            }
        ]

        inquirer.prompt(questions)
            .then(response => {
                const query = `UPDATE employee SET ? WHERE id = ?;`;
                let manager_id = response.manager_id !== 0 ? response.manager_id : null;
                db.query(query, [
                    { manager_id: manager_id },
                    response.id
                ], (err, res) => {
                    if (err) throw err;

                    console.log(`The employees manager has been successfully updated!`);
                    seeEmployeesAndManagers();

                });
            })
            .catch(err => {
                console.error(err);
            });
    })

};

//* see employee by manager
//* see employee first name and last name concatenated and manager first name and last name concatenated
function seeEmployeesAndManagers() {
    db.query(`SELECT CONCAT (e1.first_name, ' ', e1.last_name) AS Employee,
    CONCAT(e2.first_name, ' ', e2.last_name)
    AS 'Manager' FROM employee e2
    INNER JOIN employee e1 ON e1.manager_id = e2.id
    ORDER BY Employee;`, function (err, results) {
        console.table(results)
        startPrompt();
    })
}

//* default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//* view employee by manager
function viewEmployeeByManager() {
    db.query(`SELECT CONCAT (e1.first_name, ' ', e1.last_name) AS Manager,
    CONCAT(e2.first_name, ' ', e2.last_name) 
    AS Employee FROM employee e2
    INNER JOIN employee e1 ON e1.id = e2.manager_id
    ORDER BY Manager;`, function (err, results) {
        console.table(results);
        startPrompt();
    });
}

//* view employee by department
function viewEmployeeByDepartment() {
    db.query(`SELECT CONCAT (employee.first_name,' ', 
    employee.last_name) AS Employee, 
    department.department_name AS Department
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id`, function (err, results) {
        console.table(results);
        startPrompt();
    })
}

//* function to delete an existing department
function deleteDepartment() {
    //* using map to loop through department names and ids in database
    db.query(`SELECT * FROM department`, (err, results) => {
        const departmentChoices = results.map(({ department_name, id }) => ({ name: department_name, value: id }));

        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: 'Which department would you like to delete from the database?',
                    choices: departmentChoices
                }
            ])

            .then(input => {
                const params = input.department;

                db.query(`DELETE FROM department WHERE id = ?`, params, function (err, results) {
                    if (err) throw err;
                    console.log(`Successfully deleted ${input.department} from the database!`)
                    viewAllDepartments();
                })
            })
    })
}

//* initialize prompt with user options when starting application
startPrompt()