const { prompt } = require("inquirer");
const mysql = require('mysql2/promise');
const mod_tab = require('tab');
const cTable = require('console.table');
let db; // global to be made accesible by inquirer functions

console.log(`
    MMMMMMMMMMMMN0kKNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWXNNMMMMMMMMMMMMMMMMMMMMM
    MMMMMMMMMMMMXc..;:cokKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM0,cNMMMMMMMMMMMMMMMMMMMMM
    MMMMMMMMMMMMMk.;kOxoc:cOWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMO,oWMMMMMMMMMMMMMMMMMMMMM
    MMMMMMMMMMMMWo.;dxdol,.oNMNOlcclOWWXkolllokKWMNklcokXMMO,dWMMNklcco0WMMMMMMMMMMM
    MMMMMMMMMMMMK;.;clodxOKWM0:.,o:.;KO,.;dkxdc;dKl .;l;;OWk,xMWO,.;o;.:XMMMMMMMMMMM
    MMMMMMMMMMMMO.:XMMMMMMMMK;'cc::cOWk.;KMMWNO,;o' 'OWO.;Xx'xMO,,lc::cOWMMMMMMMMMMM
    MMMMMMMMMMMMk'cNMMMMMMMMO',ONNNWWXKo;colllco0x.';;c::xNO,lNk.;0NNNWNNWMMMMMMMMMM
    MMMMMMMMMMMMNKXWMMMMMMMMWOc;cllcclONNK00KXNMMk'oNK0KNMMWKKWWk:;clllcl0WMMMMMMMMM
    MMMMMMMMMMMMMMMMMMMMMMMMMMWXOkkOKNWMMMMMMMMMMO,lWMMMMMMMMMMMMWKOkkOKNWMMMMMMMMMM
    MMMMMMN0KWMWXXWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXc,0MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    MMMMMMx..xW0;'kWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    MMMMMNc  ,kl  lWMMMMWNNWWMMMMMWWMNKXMMMMMMWNNWMMMMMMMMMMMMMMMMMN0kOKWMMNkdox0NMM
    MMMMWk.':.....cNMWKdcllcoKMMMKldx:.,kWW0docllcxXMMMWKxlcxXWWMXd;:c;'dNK:.:llcoKM
    MMMWO,.kXd'ck;,KWk;:OX0; ,OWMO..,ox,:0d,,l0Xx. cXMNd',dkkxcoO:.':c,'dNo.oWMMWXNM
    MMMO'.xWMWNWWd.dNd.:dl;:l;,o0x.;0WWo,dc.;ldc;cl,;x0o.,loc..xo.l0kdkKWWl.oWMMMMMM
    MMMXxOWMMMMMMXc;ONklloONMNklkK0XMMMXk0Kdllld0WWKdo0N0xdd:.lN0:'lk0OkdoolOWMMMMMM
    MMMMMMMMMMMMMMNKXMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWo,OMMNkocclloxXMMMMMMMMM
    MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNdlO0;:XMMMMMMWMMMMMMMMMMMMMM
    MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNx;'.'kWMMMMMMMMMMMMMMMMMMMMM
    MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWKkKWMMMMMMMMMMMMMMMMMMMMMM
    `)

//initialize code by signing in to database
async function init() {

// Connect to database
    db = await mysql.createConnection(
        {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password
        password: '',
        database: 'employees_db'
        }
        // console.log(`Connected to the employees_db database.`)
    );
}

//initialize main menu option list
let mainMenuOptionList = [
    "View all departments", 
    "View all roles", 
    "View all employees", 
    "Add a department", 
    "Add a role", 
    "Add an employee", 
    "Update an employee role",
    "Exit"
];
// display and selection of main menu
async function mainMenuOptions() {
    await init();
    
    const {mainMenuSelection} = await prompt([
        {
            type: 'list',
            name: 'mainMenuSelection',
            message: 'What would you like to do?',
            choices: mainMenuOptionList
        }
    ]);
    switch (mainMenuSelection) {
        case "View all departments": 
            viewAllDepts();
            break;
        case "View all roles": 
            viewAllRoles();
            break;
        case "View all employees": 
            viewAllEmployees();
            break;
        case "Add a department":
            addDepartment();
            break; 
        case "Add a role":
            addRole();
            break; 
        case "Add an employee":
            addEmployee();
            break; 
        case "Update an employee role":
            updateEmployee();
            break;
         case "Exit":
            runExit();
            break;
    //      default:
    //         break;
    }

    // console.log(mainMenuSelection);
    
}
// view departments query
async function viewAllDepts() {
    
    const [seeDepartments] = await db.execute("SELECT * FROM departments");    
    await console.table(cTable.getTable(seeDepartments));
    await mainMenuOptions();
   
}

// view roles query
async function viewAllRoles() {
    
    const [seeRoles] = await db.execute(`SELECT roles.title AS Title, departments.department_name AS Departments, roles.salary AS Salary FROM roles 	JOIN (SELECT * FROM DEPARTMENTS) AS Departments ON roles.department_id = departments.deptId`);    
    await console.table(cTable.getTable(seeRoles));
    await mainMenuOptions();
   
}

// view employees query
async function viewAllEmployees() {
    
    const [seeEmployees] = await db.execute(`
    SELECT employees.employeeId, employees.first_name AS FirstName, employees.last_name AS LastName, roles.title AS Title, departments.department_name AS Departments, roles.salary AS Salary, concat(Managers.first_name, " ",Managers.last_name) AS Managers FROM employees LEFT JOIN roles ON employees.role_id = roles.roleId JOIN (SELECT * FROM DEPARTMENTS) AS Departments ON roles.department_id = departments.deptId LEFT JOIN (SELECT * FROM EMPLOYEES) AS Managers ON employees.manager_id = Managers.employeeId;`);    
    await console.table(cTable.getTable(seeEmployees));
    await mainMenuOptions();
   
}
    
// add new department name
async function addDepartment() {
    
    const {department_name} = await prompt([
        {
            type: 'input',
            message: "What is the name of the department you'd like to add?",
            name: 'department_name',
        },
    ]);

    await db.execute(`INSERT INTO departments (department_name) VALUES ("${department_name}");`);
    // console.log(department_name);

    await mainMenuOptions();
}

async function addRole() {

    const [departments] = await db.execute("SELECT * FROM departments");
    
    let {title, salary, departmentSelection} = await prompt([
        {
            type: 'input',
            message: "What is the name of the role?",
            name: 'title',
        },
        {
            type: 'input',
            message: "What is the salary for the role?",
            name: 'salary',
        },
        {
            type: 'list',
            name: 'departmentSelection',
            message: 'To which department does this role belong?',
            choices: departments.map((department) => ({name:department.department_name, value: department}))
        }
    ]);
    
    await db.execute(`INSERT INTO roles (title, salary, department_id) VALUES ("${title}","${salary}", "${departmentSelection.deptId}");`);    

    await mainMenuOptions();
}

async function addEmployee() {
    
    const [roles] = await db.execute("SELECT * FROM roles");
    const [employees] = await db.execute("SELECT * FROM employees");
    // console.log(employees);
    const nullBoi = {
        employeeId: null,
        first_name: "None",
        last_name: "",
        role_id: null,
        manager_id: null
    }
    employees.unshift(nullBoi)
    
    let {first_name, last_name, roleSelection, mgrSelection} = await prompt([
        {
            type: 'input',
            message: "What is their first name?",
            name: 'first_name',
        },
        {
            type: 'input',
            message: "What is their last name?",
            name: 'last_name',
        },
        {
            type: 'list',
            name: 'roleSelection',
            message: 'What is their role?',
            choices: roles.map((role) => ({name:role.title, value: role}))
        },
        {
            type: 'list',
            name: 'mgrSelection',
            message: 'Who is their manager?',
            choices: employees.map((employee)=>({name:`${employee.first_name} ${employee.last_name}`, value: employee}))
        }
    ]);
    
    // const newEmployeeRole = await db.execute(`SELECT title from EMPLOYEES WHERE employeeId = ${mgrSelection}`) 
    if (mgrSelection.first_name !== "None") {
        await db.execute(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${first_name}","${last_name}", "${roleSelection.roleId}", "${mgrSelection.employeeId}");`);
    }
    else {
        await db.execute(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${first_name}","${last_name}", "${roleSelection.roleId}", NULL);`);
    }
        
    await mainMenuOptions();
}

async function updateEmployee() {
    
    const [roles] = await db.execute("SELECT * FROM roles");
    const [employees] = await db.execute("SELECT * FROM employees");
    // console.log(employees);
    const nullBoi = {
        employeeId: null,
        first_name: "None",
        last_name: "",
        role_id: null,
        manager_id: null
    }
    employees.unshift(nullBoi)
    
    let {employeeSelection, roleSelection} = await prompt([
        {
            type: 'list',
            name: 'employeeSelection',
            message: 'Which employee would you like to update?',
            choices: employees.map((employee)=>({name:`${employee.first_name} ${employee.last_name}`, value: employee}))
        },
        {
            type: 'list',
            name: 'roleSelection',
            message: 'What would you like to assign as their role?',
            choices: roles.map((role) => ({name:role.title, value: role}))
        }
    ]);
    
    await db.execute(`UPDATE employees SET role_id = ${roleSelection.roleId} where employeeId = ${employeeSelection.employeeId};`);
        
    await mainMenuOptions();
}

async function runExit() {
    process.exit(0);
};

// // selectDepartment();
mainMenuOptions();

