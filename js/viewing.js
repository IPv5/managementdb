const inquirer = require("inquirer");
const main = require("../main");

function viewEmployeeInformation() {
    inquirer
        .prompt([{
            name: "infoChoice",
            type: "list",
            message: "What would you like to do?",
            choices: () => {
                return [
                    "View departments",
                    "View roles",
                    "View employees"
                ]
            }
        }])
        .then(answer => {
            // console.log(answer.infoChoice);
            switch (answer.infoChoice) {
                case "View departments":
                    viewDepartment();
                    break;
                case "View roles":
                    viewRoles();
                    break;
                case "View employees":
                    viewEmployees();
                    break;
            }
            if (answer.viewMore) {
                viewEmployeeInformation();
            } else {
                main.runSearch();
            }

        });
}

function viewDepartment() {
    inquirer.prompt({
        type: "input",
        name: "specificDepartment",
        message: "What department?"
    }).then(answer => {
        connection.query("SELECT * FROM department WHERE ?", { department: answer.input }, function(err, res) {
            console.log(answer.input);
        });
        console.log(answer.input);
    });
}

function viewRoles() {
    inquirer.prompt({
        type: "input",
        name: "specificRole",
        message: "What role?"
    }).then(answer => {
        connection.query("SELECT * FROM role WHERE ?", { department: answer.input }, function(err, res) {
            console.log(answer.input);
        });
        console.log(answer.input);
    });
}

function viewEmployees() {
    inquirer.prompt({
        type: "input",
        name: "specificEmployee",
        message: "What employee?"
    }).then(answer => {
        connection.query("SELECT * FROM employee WHERE ?", { department: answer.input }, function(err, res) {
            console.log(answer.input);
        });
        console.log(answer.input);
    });
}

module.exports.viewEmployeeInformation = viewEmployeeInformation;
module.exports.viewDepartment = viewDepartment;
module.exports.viewRoles = viewRoles;
module.exports.viewEmployees = viewEmployees;