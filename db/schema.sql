DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;


CREATE TABLE department (
    id INT  -- id param (departments.id) --
    AUTO_INCREMENT PRIMARY KEY, -- id given primary key attribute and auto-increment field attribute --
    department_name VARCHAR(30) NOT NULL -- name param (departments.name) --
);

-- to see departments table --
SELECT * FROM employee_tracker_db.department;
SELECT * FROM department; -- see all departments --

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

DESCRIBE role;

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

DESCRIBE employee;
