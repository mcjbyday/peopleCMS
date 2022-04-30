const { prompt } = require("inquirer");

async function example() {
    const {size} = await prompt([
        {
        type: 'list',
        name: 'size',
        message: 'what size do you need?',
        choices: ['a','b','c','d']
        }
    ]);

    console.log(size);
}

example();