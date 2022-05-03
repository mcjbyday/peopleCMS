const { prompt } = require("inquirer");
const mysql = require('mysql2/promise');
const Employee = require("./lib/Employee");
const mod_tab = require('tab');
let db; // global to be made accesible by inquirer functions
// link classes for roles and employees
// const Employee = require('./lib/Employee');
// const Role = require('./lib/Role');

// console.log(`
//     MMMMMMMMMMMMN0kKNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWXNNMMMMMMMMMMMMMMMMMMMMM
//     MMMMMMMMMMMMXc..;:cokKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM0,cNMMMMMMMMMMMMMMMMMMMMM
//     MMMMMMMMMMMMMk.;kOxoc:cOWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMO,oWMMMMMMMMMMMMMMMMMMMMM
//     MMMMMMMMMMMMWo.;dxdol,.oNMNOlcclOWWXkolllokKWMNklcokXMMO,dWMMNklcco0WMMMMMMMMMMM
//     MMMMMMMMMMMMK;.;clodxOKWM0:.,o:.;KO,.;dkxdc;dKl .;l;;OWk,xMWO,.;o;.:XMMMMMMMMMMM
//     MMMMMMMMMMMMO.:XMMMMMMMMK;'cc::cOWk.;KMMWNO,;o' 'OWO.;Xx'xMO,,lc::cOWMMMMMMMMMMM
//     MMMMMMMMMMMMk'cNMMMMMMMMO',ONNNWWXKo;colllco0x.';;c::xNO,lNk.;0NNNWNNWMMMMMMMMMM
//     MMMMMMMMMMMMNKXWMMMMMMMMWOc;cllcclONNK00KXNMMk'oNK0KNMMWKKWWk:;clllcl0WMMMMMMMMM
//     MMMMMMMMMMMMMMMMMMMMMMMMMMWXOkkOKNWMMMMMMMMMMO,lWMMMMMMMMMMMMWKOkkOKNWMMMMMMMMMM
//     MMMMMMN0KWMWXXWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXc,0MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
//     MMMMMMx..xW0;'kWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
//     MMMMMNc  ,kl  lWMMMMWNNWWMMMMMWWMNKXMMMMMMWNNWMMMMMMMMMMMMMMMMMN0kOKWMMNkdox0NMM
//     MMMMWk.':.....cNMWKdcllcoKMMMKldx:.,kWW0docllcxXMMMWKxlcxXWWMXd;:c;'dNK:.:llcoKM
//     MMMWO,.kXd'ck;,KWk;:OX0; ,OWMO..,ox,:0d,,l0Xx. cXMNd',dkkxcoO:.':c,'dNo.oWMMWXNM
//     MMMO'.xWMWNWWd.dNd.:dl;:l;,o0x.;0WWo,dc.;ldc;cl,;x0o.,loc..xo.l0kdkKWWl.oWMMMMMM
//     MMMXxOWMMMMMMXc;ONklloONMNklkK0XMMMXk0Kdllld0WWKdo0N0xdd:.lN0:'lk0OkdoolOWMMMMMM
//     MMMMMMMMMMMMMMNKXMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWo,OMMNkocclloxXMMMMMMMMM
//     MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNdlO0;:XMMMMMMWMMMMMMMMMMMMMM
//     MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNx;'.'kWMMMMMMMMMMMMMMMMMMMMM
//     MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWKkKWMMMMMMMMMMMMMMMMMMMMMM
//     `)

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
    //     case "Update an employee role":
    //         updateEmployee();
    //         break;
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
    await viewAllDeptsConsole(seeDepartments);
    await mainMenuOptions();
   
}
// view departments display formatting
async function viewAllDeptsConsole(myList) {
    let employeesFullNameList = myList.map((department)=>(department.deptId));
    let myListCol2 = myList.map((department)=>(department.department_name));
    let arrNew = [];
    let objNew = [];
    
    for (let i = 0; i < employeesFullNameList.length; i++) {
        
        objNew = [employeesFullNameList[i], myListCol2[i]];
        arrNew.push(objNew)
    
    }
    // console.log(arrNew);
    mod_tab.emitTable({
        'columns': [{
            'label': 'ID',
            'align': 'left',
            'width': 6
        }, {
            'label': 'Department name',
            'align': 'left',
            'width': 10
        }],
        'rows': arrNew
      });
}
// view roles query
async function viewAllRoles() {
    
    const [seeRoles] = await db.execute("SELECT * FROM roles");    
    await viewAllRolesConsole(seeRoles);
    await mainMenuOptions();
   
}
// view departments display formatting
async function viewAllRolesConsole(myList) {
    
    let employeesFullNameList = myList.map((role)=>(role.roleId));
    let myListCol2 = myList.map((role)=>(role.title));
    let myListCol3 = myList.map((role)=>(role.salary));
    let myListCol4 = myList.map((role)=>(role.department_id));

    let arrNew = [];
    let objNew = [];
    
    for (let i = 0; i < employeesFullNameList.length; i++) { 
        objNew = [employeesFullNameList[i], myListCol2[i], myListCol3[i], myListCol4[i]];
        arrNew.push(objNew)
    }
    // console.log(arrNew);
    mod_tab.emitTable({
        'columns': [{
            'label': 'ID',
            'align': 'left',
            'width': 6
        }, {
            'label': 'Title',
            'align': 'left',
            'width': 35
        }, {
            'label': 'Salary',
            'align': 'left',
            'width': 10
        },
        {
            'label': 'Department ID',
            'align': 'left',
            'width': 6
        }],
        'rows': arrNew
      });
}
   
// view employees query
async function viewAllEmployees() {
    
    const [seeEmployees] = await db.execute("SELECT * FROM employees");    
    await viewAllEmployeesConsole(seeEmployees);
    await mainMenuOptions();
   
}
// view employees display formatting
async function viewAllEmployeesConsole(myList) {
    let employeesFullNameList = myList.map((employee)=>(employee.employeeId));
    let myListCol2 = myList.map((employee)=>(employee.first_name));
    let myListCol3 = myList.map((employee)=>(employee.last_name));
    let myListCol4 = myList.map((employee)=>(employee.role_id));
    let myListCol5 = myList.map((employee)=> {
        let mgrid = String(employee.manager_id);
        if (mgrid) {
            return mgrid;
        }
        else {
            return "None";
        }
        });

    let arrNew = [];
    let objNew = [];
    
    for (let i = 0; i < employeesFullNameList.length; i++) { 
        objNew = [employeesFullNameList[i], myListCol2[i], myListCol3[i], myListCol4[i], myListCol5[i]];
        arrNew.push(objNew)
    }
    // console.log(arrNew);
    mod_tab.emitTable({
        'columns': [{
            'label': 'ID',
            'align': 'left',
            'width': 6
        }, {
            'label': 'First Name',
            'align': 'left',
            'width': 15
        }, {
            'label': 'Last Name',
            'align': 'left',
            'width': 15
        },
        {
            'label': 'Role ID',
            'align': 'left',
            'width': 10
        },
        {
            'label': 'Manager ID',
            'align': 'left',
            'width': 6
        }],
        'rows': arrNew
      });
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

async function runExit() {
    process.exit(0);
};


// // selectDepartment();
mainMenuOptions();


// async function selectADepartment() {
//     await init();
    
//     const [departments] = await db.execute("SELECT * FROM departments");

//     const {departmentSelection
//     } = await prompt([
//         {
//         type: 'list',
//         name: 'departmentSelection',
//         message: 'Which department do you want to view?',
//         choices: departments.map((department) => ({name:department.department_name, value: department}))
//         }
//     ]);

//     console.log(departmentSelection);
// }