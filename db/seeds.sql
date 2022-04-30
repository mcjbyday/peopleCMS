
INSERT INTO departments (department_name)
VALUES ("Marketing"),
       ("Production"),
       ("Product"),
       ("Business Development"),
       ("UX Design"),
       ("Client Success"),
       ("Engineering - Front-End"),
       ("Engineering - Platform"),
       ("Engineering - Data");
    
INSERT INTO roles (title, salary, department_id)
VALUES ("Marketing Manager", 92500.00, 1),
       ("Head of Production", 122000.00, 2),
       ("VP of Product", 168000.00, 3),
       ("Head of Sales", 148000.00, 4),
       ("UX Designer I", 76000.00, 5),
       ("Design Director", 115000.00, 5),
       ("Associate Director of Client Success", 90000.00, 6),
       ("Client Success Manager", 68000.00, 6),
       ("Senior Software Engineer", 135000.00, 7),
       ("Jr. Software Engineer", 82000.00, 7),
       ("Cloud Engineer", 112000.00, 8),
       ("Data Engineer I", 88000.00, 9);
    
INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Elliot", "Smith", 1),
        ("Amira", "Afzal", 2),
        ("Christoper", "Lee", 3),
        ("Verónica", "Rodriguez", 4),
        ("Mikaila", "Young", 6),
        ("Farah", "Wilson", 5),
        ("Cake", "Fontaine", 10),
        ("Maxwell", "Dixon", 10),
        ("Mary", "Kugol", 11),
        ("Edmond", "James", 12);
    
-- INSERT INTO employees (first_name, last_name, role_id, manager_id)
-- VALUES ("Elliot", "Smith", 1, NULL),
--        ("Amira", "Afzal", 2, 3),
--        ("Christoper", "Lee", 3, NULL),
--        ("Verónica", "Rodriguez", 4, NULL),
--        ("Mikaila", "Young", 6, 6),
--        ("Farah", "Wilson", 5, NULL),
--        ("Cake", "Fontaine", 10, NULL),
--        ("Maxwell", "Dixon", 10, 7),
--        ("Mary", "Kugol", 11, 7),
--        ("Edmond", "James", 12, 7);
       
-- SELECT * FROM employees;

-- Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`employees_db`.`employees`, CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `employees` (`employeeId`) ON DELETE SET NULL)
