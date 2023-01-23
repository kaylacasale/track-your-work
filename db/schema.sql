-- Drops the employee_tracker_db if it exists currently --
DROP DATABASE IF EXISTS employee_tracker_db;
-- Creates the employee_tracker_db database --
CREATE DATABASE employee_tracker_db;

-- use employee_tracker_db database --
USE employee_tracker_db;

-- drops existing tables to allow new tables in database --
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

-- creates the table "department" within the employee_tracker_db --
CREATE TABLE department (
    id INT  -- id param (departments.id) --
    AUTO_INCREMENT PRIMARY KEY, -- id given primary key attribute and auto-increment field attribute --
    department_name VARCHAR(30) NOT NULL -- name param (departments.name) --
);

-- creates the table "role" within the employee_tracker_db -- 
CREATE TABLE role (
    id INT
    AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    -- ^ relate foreign key (department_id) paramater of role to department's primary key (id) --
    FOREIGN KEY (department_id) 
    REFERENCES department(id) 
    -- if a department is deleted, delete role associated --
    ON DELETE SET NULL 
);

-- creates the table "employee" within the employee_tracker_db --
CREATE TABLE employee (
    id INT
    AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT, -- references to role primary key (id) --
    manager_id INT NULL, -- allow null if employee has no manager --
    CONSTRAINT FK_role
    FOREIGN KEY(role_id)
    REFERENCES role(id)
    ON DELETE SET NULL, -- delete role_id if role is deleted --
	
    CONSTRAINT FK_manager 
    FOREIGN KEY (manager_id) 
    REFERENCES employee(id)
);


