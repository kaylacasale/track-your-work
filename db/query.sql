SELECT *
FROM role
JOIN department ON role.department_id = department.id;

SELECT *
FROM employee
JOIN role ON employee.role_id = role.id;

-- to see departments table (two methods) --
SELECT * FROM employee_tracker_db.department;
SELECT * FROM department; -- see all departments --

-- to see all Departments (id, department_name and department_id) --
SELECT * FROM department;

-- see all departments (define each column name) - broken --
SELECT department.id AS id,
department.department_name AS department
FROM department;

-- ^ joined --
SELECT department.id AS id, department.department_name AS department FROM department;

-- to see all Roles (id, title, salary, and department_id) (two methods) --
SELECT * FROM role;
DESCRIBE role;

-- see all roles (define each column name) --
-- can use JOIN or INNER JOIN here --
-- job title = title, role id = id, department = (from department_id), salary = salary --
SELECT role.title AS 'Job Title', role.id AS 'Role id', department.department_name AS Department, role.salary AS Salary
FROM role
INNER JOIN department ON role.department_id = department.id;

-- ^ unbroken syntax for best entry into JS (?) --
SELECT role.title AS 'Job Title', role.id AS 'Role id', department.department_name AS Department, role.salary AS Salary FROM role INNER JOIN department ON role.department_id = department.id;


-- to see all Employees (id, first_name, last_name, role_id, manager_id) (two methods) --
SELECT * FROM employee;
DESCRIBE employee;

-- see all employees (with defined columns)
-- employee.id = Employee id, CONCAT employee.(first_name + last_name) = Name, employee.role_id (role.title) as Job Title, employee.role_id (role.salary) as Salary, employee.manager_id (employee.id, employee.first/last_name) as Manager --
SELECT employee.id AS 'Employee ID', 
CONCAT (employee.first_name, ' ', employee.last_name) AS Name, 
role.title AS 'Job Title' ,
department.department_name AS 'Department',
role.salary AS 'Salary',
CONCAT (manager.first_name, ' ', manager.last_name) AS 'Manager'
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id;



-- how to select employee, show employee's first and last name (concatenated), role id, and associated manager first and last name by manager_id --
SELECT CONCAT (e1.first_name, ' ', e1.last_name) AS Employee, e1.role_id AS role_id,
CONCAT(e2.first_name, ' ', e2.last_name)
AS 'Manager' FROM employee e2
INNER JOIN employee e1 ON e1.manager_id = e2.id
ORDER BY Employee;

SELECT e1.id AS 'Employee ID', e1.first_name AS 'Employee First Name', e1.last_name AS 'Employee Last Name', e1.role_id AS role_id, e1.manager_id AS ManagerID,
CONCAT(e2.first_name, ' ', e2.last_name)
AS 'Manager' FROM employee e2
INNER JOIN employee e1 ON e1.manager_id = e2.id OR null
ORDER BY ManagerID;


SELECT e1.id AS 'Employee ID', e1.first_name AS 'Employee First Name', e1.last_name AS 'Employee Last Name', e1.role_id AS role_id, e1.manager_id AS ManagerID,
CONCAT(e2.first_name, ' ', e2.last_name)
AS 'Manager' FROM employee e2
LEFT JOIN employee e1 ON e1.manager_id = e2.id
ORDER BY ManagerID;


-- view after updating employeeRole() --
-- see all Employees and associated Role (example use = after updating employeeRole) --
SELECT 
CONCAT (employee.first_name, ' ', employee.last_name) AS 'Employee Name',
role.title AS 'Job Title / Role' 
FROM employee
LEFT JOIN role ON employee.role_id = role.id;

-- table with manager_id and manager names --
SELECT employee.manager_id, CONCAT (manager.first_name, ' ', manager.last_name) AS Managers
FROM employee
LEFT JOIN employee manager ON employee.manager_id = manager.id;

-- show id, first_name, and last_name of managers --
SELECT employee.id, employee.first_name, employee.last_name
FROM employee
WHERE employee.manager_id = employee.id;

-- see manager first name associated with manager_id --
SELECT e1.manager_id, e1.first_name
FROM employee e1
INNER JOIN employee e2
ON e1.id = e2.manager_id;

-- after updateEmployeeManager() --
-- see Employee (first and last name) and Manager (first and last name) --
SELECT CONCAT (e1.first_name, ' ', e1.last_name) AS Employee,
CONCAT(e2.first_name, ' ', e2.last_name)
AS 'Manager' FROM employee e2
INNER JOIN employee e1 ON e1.manager_id = e2.id
ORDER BY Employee;

-- view employee by manager (with defined columns) --
SELECT CONCAT (e1.first_name, ' ', e1.last_name) AS Manager,
CONCAT(e2.first_name, ' ', e2.last_name) 
AS Employee FROM employee e2
INNER JOIN employee e1 ON e1.id = e2.manager_id
ORDER BY Manager;

-- how to select employee, show employee's first and last name (concatenated), role id, and associated manager first and last name by manager_id --
SELECT CONCAT (e1.first_name, ' ', e1.last_name) AS Employee, e1.role_id AS role_id,
CONCAT(e2.first_name, ' ', e2.last_name)
AS 'Manager' FROM employee e2
INNER JOIN employee e1 ON e1.manager_id = e2.id
ORDER BY Employee;

-- see Employee (first and last name) and Manager (first and last name) --
SELECT CONCAT (e1.first_name, ' ', e1.last_name) AS Employee,
CONCAT(e2.first_name, ' ', e2.last_name)
AS 'Manager' FROM employee e2
INNER JOIN employee e1 ON e1.manager_id = e2.id
ORDER BY Employee;

-- show Employee ID, Employee First Name, Employee Last Name, role_id, ManagerID, and Manager in defined columns
SELECT e1.id AS 'Employee ID', e1.first_name AS 'Employee First Name', e1.last_name AS 'Employee Last Name', e1.role_id AS role_id, e1.manager_id AS ManagerID,
CONCAT(e2.first_name, ' ', e2.last_name)
AS 'Manager' FROM employee e2
LEFT JOIN employee e1 ON e1.manager_id = e2.id
ORDER BY ManagerID;

-- view employee by department --
SELECT CONCAT (employee.first_name,' ', 
employee.last_name) AS Employee, 
department.department_name AS Department
FROM employee 
LEFT JOIN role ON employee.role_id = role.id 
LEFT JOIN department ON role.department_id = department.id

-- to see database in use --
SELECT DATABASE();