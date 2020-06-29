const inquirer = require("inquirer");
const main = require("../main");

function addEmployeeInformation() {
    inquirer
        .prompt({
            name: "infoChoice",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add departments",
                "Add roles",
                "Add employees"
            ]
        })
        .then(answer => {
            // console.log(answer.infoChoice);
            switch (answer.infoChoice) {
                case "Add departments":
                    addDepartment();
                    break;
                case "Add roles":
                    addRoles();
                    break;
                case "Add employees":
                    addEmployees();
                    break;
            }
        });
}

function addRoles() {
    inquirer.prompt({
        type: "input",
        name: "addMore",
        message: "What role?"
    }).then(answer => {
        console.log("Printing addMore input here");
        console.log(answer.addMore);
        main.connection.query("INSERT INTO role (title) VALUES(?);", [answer.addMore], function(err, res) {
            if (err) throw err;
            console.log("Adding a role " + res.addMore);
        });
        inquirer.prompt({
            name: "addMore",
            type: "confirm",
            message: "Would you like to add more?",
        }).then(answer => {
            if (answer.addMore) {
                addEmployeeInformation();
            } else {
                main.runSearch();
            }
        })
    });
}

function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "specificDepartment",
        message: "What department?"
    }).then(answer => {
        main.connection.query("SELECT * FROM department WHERE ?", { department: answer.specificDepartment }, function(err, res) {
            console.log(answer.specificDepartment);
        });
        console.log(answer.specificDepartment);
    });
}


function addEmployees() {
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

module.exports.addEmployeeInformation = addEmployeeInformation;
module.exports.addDepartment = addDepartment;
module.exports.addRoles = addRoles;
module.exports.addEmployees = addEmployees;