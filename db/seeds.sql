INSERT INTO department (department_name)
VALUES 
("Operations"),
("Marketing"),
("Human Resources"),
("IT"),
("Accounting and Finance"),
("Research and Development"),
("Product Management"),
("Legal"),
("Sales");

INSERT INTO role (title, salary, department_id)
VALUES
("VP of Operations", 300000, 1),
("Graphic Designer", 160000, 2),
("Recruiter", 90000, 3),
("Database Administrator", 96000, 4),
("Chief Financial Office (CFO)", 230000, 5),
("Research Engineer", 120000, 6),
("Product Manager", 110000, 7),
("Lawyer", 150000, 8),
("Account Manager", 100000, 9),
("Operations Analyst", 75000, 1),
("Advertising Director", 120000, 2),
("Staff Coordinator", 50000, 3),
("Analyst", 70000, 4),
("Accountant", 80000, 5),
("Research Assistant", 50000, 6),
("Associate Product Manager", 75000, 7),
("Legal Assistant", 50000, 8),
("Sales Representative", 70000, 9);

-- manager_id = null if employee has no manager --
-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES
-- ("Dennis", "Ritchie", 1, null),
-- ("Brian", "Kernighan", 2, null),
-- ("Ada", "Lovelace", 3, null),
-- ("Ken", "Thompson", 4, null),
-- ("Barbara", "Liskov", 5, null),
-- ("James", "Gosling", 6, null),
-- ("Margaret", "Hamilton", 7, null),
-- ("Tim", "BernersLee", 8, null),
-- ("Carol", "Shaw", 9, null),
-- ("Grace", "Hopper", 10, 1),
-- ("Brenden", "Eich", 11, 2),
-- ("Karen", "Jones", 12, 3),
-- ("Steve", "Wozniak", 13, 4),
-- ("Radia", "Perlman", 14, 5),
-- ("John Carmack", 15, 6),
-- ("Alan", "Kay", 16, 7),
-- ("Adele", "Goldberg", 17, 8),
-- ("Larry", "Page", 18, 9);

-- error ^ when inserting at row 15 into employee --

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Dennis", "Ritchie", 1, null),
("Brian", "Kernighan", 2, null),
("Ada", "Lovelace", 3, null),
("Ken", "Thompson", 4, null),
("Barbara", "Liskov", 5, null),
("James", "Gosling", 6, null),
("Margaret", "Hamilton", 7, null),
("Tim", "BernersLee", 8, null),
("Carol", "Shaw", 9, null),
("Grace", "Hopper", 10, 1),
("Brenden", "Eich", 11, 2),
("Karen", "Jones", 12, 3),
("Steve", "Wozniak", 13, 4),
("Radia", "Perlman", 14, 5),
("Alan", "Kay", 16, 7),
("Adele", "Goldberg", 17, 8),
("Larry", "Page", 18, 9);


