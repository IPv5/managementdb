const inquirer = require("inquirer");
const main = require("../main");

function delEmployeeInformation() {
    inquirer
        .prompt({
            name: "infoChoice",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Delete departments",
                "Delete roles",
                "Delete employees"
            ]
        })
        .then(answer => {
            // console.log(answer.infoChoice);
            switch (answer.infoChoice) {
                case "Delete departments":
                    delDepartment();
                    break;
                case "Delete roles":
                    delRoles();
                    break;
                case "Delete employees":
                    delEmployees();
                    break;
            }

        });
}

function delRoles() {
    inquirer.prompt([{
        type: "input",
        name: "delMore",
        message: "What role?"
    }]).then(answer => {
        console.log("test");
        connection.query("SELECT * FROM role WHERE ?", { department: answer.delMore }, function(err, res) {
            console.log(answer.delMore);
            inquirer.prompt({
                name: "delMore",
                type: "confirm",
                message: "Would you like to delete more?",
            }).then(answer => {
                if (answer.delMore) {
                    delEmployeeInformation();
                } else {
                    main.runSearch();
                }
            })
        });
        console.log(answer.delMore);
    });
}

function delDepartment() {
    inquirer.prompt({
        type: "input",
        name: "specificDepartment",
        message: "What department?"
    }).then(answer => {
        connection.query("SELECT * FROM department WHERE ?", { department: answer.specificDepartment }, function(err, res) {
            console.log(answer.specificDepartment);
        });
        console.log(answer.specificDepartment);
    });
}


function delEmployees() {
    inquirer.prompt({
        type: "input",
        name: "specificEmployee",
        message: "What employee?"
    }).then(answer => {
        connection.query("SELECT * FROM employee WHERE ?", { department: answer.specificEmployee }, function(err, res) {
            console.log(answer.specificEmployee);
        });
        console.log(answer.specificEmployee);
    });
}

module.exports.delEmployeeInformation = delEmployeeInformation;
module.exports.delDepartment = delDepartment;
module.exports.delRoles = delRoles;
module.exports.delEmployees = delEmployees;