const { prompt } = require("inquirer");
const mysql = require('mysql2/promise');
const Employee = require("./lib/Employee");
const mod_tab = require('tab');
let db; // global to be made accesible by inquirer functions
// link classes for roles and employees
// const Employee = require('./lib/Employee');
// const Role = require('./lib/Role');

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
    //     case "Add a department":
    //         addDepartment();
    //         break; 
    //     case "Add a role":
    //         addRole();
    //         break; 
    //     case "Add an employee":
    //         addEmployee();
    //         break; 
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

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids

async function viewAllDepts() {
    
    const [seeDepartments] = await db.execute("SELECT * FROM departments");    
    await viewAllDeptsConsole(seeDepartments);
    await mainMenuOptions();
   
}

async function viewAllDeptsConsole(myList) {
    let myListCol1 = myList.map((department)=>(department.deptId));
    let myListCol2 = myList.map((department)=>(department.department_name));
    let arrNew = [];
    let objNew = [];
    
    for (let i = 0; i < myListCol1.length; i++) {
        
        objNew = [myListCol1[i], myListCol2[i]];
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

async function viewAllRoles() {
    
    const [seeRoles] = await db.execute("SELECT * FROM roles");    
    await viewAllRolesConsole(seeRoles);
    await mainMenuOptions();
   
}

async function viewAllRolesConsole(myList) {
    
    let myListCol1 = myList.map((role)=>(role.roleId));
    let myListCol2 = myList.map((role)=>(role.title));
    let myListCol3 = myList.map((role)=>(role.salary));
    let myListCol4 = myList.map((role)=>(role.department_id));

    let arrNew = [];
    let objNew = [];
    
    for (let i = 0; i < myListCol1.length; i++) { 
        objNew = [myListCol1[i], myListCol2[i], myListCol3[i], myListCol4[i]];
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
   

async function viewAllEmployees() {
    
    const [seeEmployees] = await db.execute("SELECT * FROM employees");    
    await viewAllEmployeesConsole(seeEmployees);
    await mainMenuOptions();
   
}

async function viewAllEmployeesConsole(myList) {
    let myListCol1 = myList.map((employee)=>(employee.employeeId));
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
    
    for (let i = 0; i < myListCol1.length; i++) { 
        objNew = [myListCol1[i], myListCol2[i], myListCol3[i], myListCol4[i], myListCol5[i]];
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



// async function addDepartment() {
//     await init();
    
//     const {department_name} = await prompt([
//         {
//             type: 'input',
//             message: "What is the name of the department you'd like to add?",
//             name: 'department_name',
//         },
//     ]);

//     await db.execute(`INSERT INTO departments (department_name)
//     VALUES (${department_name});`);
//     console.log(department_name);

//     await mainMenuOptions();

// }

// async function addEmployee() {
//     await init();
    
//     let {first_name, last_name, role_id, manager_id} = await prompt([
//         {
//             type: 'input',
//             message: "What is their first name?",
//             name: 'first_name',
//         },
//         {
//             type: 'input',
//             message: "What is their last name?",
//             name: 'last_name',
//         },
//         {
//             type: 'input',
//             message: "What is their role ID number?",
//             name: 'role_id',
//         },
//         {
//             type: 'input',
//             message: "If you know their manager's employee ID, provide it here, otherwise hit enter.",
//             name: 'employee_id',
//         }
//     ]);
//     // await async () => {
//     //     if (manager_id == " " || manager_id == "") {
//     //         manager_id = NULL;
//     //     }    
//     // }
//     await db.execute(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
//     VALUES ("${first_name}", "${last_name}", ${role_id}, ${manager_id});`);

//     console.log(departmentSelection);
//     await mainMenuOptions();
// }

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