SELECT *
FROM role
JOIN department ON role.department_id = department.id;

SELECT *
FROM employee
JOIN role ON employee.role_id = role.id;

-- to see all Departments (id, department_name and department_id) --
SELECT * FROM department;

-- to see all Roles (id, title, salary, and department_id) --
SELECT * FROM role;

-- to see all Employees (id, first_name, last_name, role_id, manager_id)
SELECT * FROM employee;

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


-- allow employee_id, role_id and manager_id to equal null --

SELECT e1.id AS 'Employee ID', e1.first_name AS 'Employee First Name', e1.last_name AS 'Employee Last Name', e1.role_id AS role_id, e1.manager_id AS ManagerID,
CONCAT(e2.first_name, ' ', e2.last_name)
AS 'Manager' FROM employee e2
LEFT JOIN employee e1 ON e1.manager_id = e2.id
ORDER BY ManagerID;