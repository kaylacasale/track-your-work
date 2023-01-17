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
