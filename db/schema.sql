DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;


CREATE TABLE departments (
    deptId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);


CREATE TABLE roles (
    roleId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- to hold role title
    title VARCHAR(30), 
    --  to hold role salary
    salary DECIMAL 
    -- to hold reference to department role belongs to
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(deptId)
    ON DELETE SET NULL   
);

CREATE TABLE employees (
    employeeId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- to hold employee first name
    first_name VARCHAR(30),
    --  to hold employee last name 
    last_name VARCHAR(30),
    -- to hold reference to employee role
    role_id INT, 
    FOREIGN KEY (role_id)
    REFERENCES roles(roleId)
    ON DELETE SET NULL   
    -- to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
    manager_id INT,
    FOREIGN KEY (manager_id)
    REFERENCES employees(employeeId)
);








