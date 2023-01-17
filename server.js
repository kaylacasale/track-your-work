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
                choices: ['View all departments', 'View all Roles', 'View all employees', 'Add a department.', 'Add a role.', 'Add an employee.', 'Update an employee role.']
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
                case 'Add an empoloyee':
                    addAnEmployee();
                    break
                case 'Update en employee role':
                    updateAnEmployeeRole()
                    break
            }
        })
};

function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
    });
}


app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

startPrompt()