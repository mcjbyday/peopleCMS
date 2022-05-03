
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
    
-- MANAGER_IDs must reference employee rows that have already been defined
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Elliot", "Smith", 1, NULL),
       ("Christoper", "Lee", 3, NULL),
       ("Amira", "Afzal", 2, 3),
       ("Verónica", "Rodriguez", 4, NULL),
       ("Farah", "Wilson", 5, NULL),
       ("Mikaila", "Young", 6, 5),
       ("Cake", "Fontaine", 9, NULL),
       ("Maxwell", "Dixon", 10, 7),
       ("Mary", "Kugol", 11, 7),
       ("Edmond", "James", 12, 7);