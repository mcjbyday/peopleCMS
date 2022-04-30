const { prompt } = require("inquirer");
const mysql = require('mysql2');

async function init() {
// Connect to database
    const db = await mysql.createConnection(
        {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password
        password: '',
        database: 'employees_db'
        },
        console.log(`Connected to the books_db database.`)
    );
}

async function getUserChoices() {
    await init();
    
    // const [employees] = await db.e

    const {size} = await prompt([
        {
        type: 'list',
        name: 'size',
        message: 'what size do you need?',
        choices: ['a','b','c','d']
        // this enables object to be the value selected, name displayed to user is just 
        // choices: employees.map(emplloyee => ({name:employee.firstname, value: employee})) 
        }
    ]);

    console.log(size);
}

getUserChoices();