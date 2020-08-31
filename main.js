const inquirer = require('inquirer');
const Table = require("console.table");

function init() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Departments",
            "View All Roles",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Role",
            "Quit"
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "View All Employees":
                viewAllEmployee();
                break;

            case "View All Departments":
                viewAllDepartment();
                break;

            case "View All Roles":
                viewAllRole();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;

            case "Update Role":
                updateRole();
                break;

            case "Quit":
                connection.end();
        }
    });

}


// view all functions
function viewAllEmployee() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        const table = Table.getTable(res);
        console.log(table);
        init();
    })
};
function viewAllDepartment() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        const table = Table.getTable(res);
        console.log(table);
        init();
    })
};
function viewAllRole() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        const table = Table.getTable(res);
        console.log(table);
        init();
    })
};



// update functions
function updateRole() {
    connection.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "choice",
                type: "list",
                choices: function () {
                    var empChoice = [];
                    for (var i = 0; i < results.length; i++) {
                        console.table(results[i]);
                        empChoice.push(results[i].first_name);
                    }
                    console.table(empChoice);
                    return empChoice;
                },
                message: "Please select an employee to update"
            }
        ]).then(function (answer) {
            var chosenName;
            for (var i = 0; i < results.length; i++) {
                if (results[i].first_name === answer.choice) {
                    chosenName = results[i];
                }
                console.log(chosenName.title);
                connection.query(
                    "UPDATE role SET ? WHERE ?",
                    [
                        {
                            title: answer.title
                        },
                        {
                            id: chosenName.id
                        }
                    ],
                    function (err) {
                        if (err) throw err;
                        init();
                    });
            }
        });

    });
}


// Adding functions
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "new_role",
            message: "What type of role would you like to add?"
        },
        {
            type: "input",
            name: "new_salary",
            message: "What's the salary be for the new role?(ex:50000)"
        },
        {
            type: "input",
            name: "new_deptID",
            message: "What is the department ID for the new role?(`##` format)"
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO role SET ?",
            {
                title: answer.new_role,
                salary: answer.new_salary,
                department_id: answer.new_deptID
            },
            function (err) {
                if (err) throw err;
                console.log("New role was added successfully!");
                init();
            });
    });

}

function addEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name."
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name."
        },
        {
            name: "role_id",
            type: "input",
            message: "What is the employee's role ID."
        },
        {
            name: "manager_id",
            type: "input",
            message: "What is the employee's manager's ID number. if no manager please enter '0'.",
            default: null
        }
    ]).then(function (answers) {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: answers.role_id,
                manager_id: answers.manager_id || null
            },

            function (err) {
                if (err) throw err;
                inquirer.prompt([
                    {
                        name: "title",
                        type: "input",
                        message: "What is the employee's title."
                    },
                    {
                        name: "salary",
                        type: "input",
                        message: "What is the employee's salary."
                    }
                ]).then(function (answers) {
                    connection.query(
                        "INSERT INTO role SET ?",
                        {
                            title: answers.title,
                            salary: answers.salary
                        },

                        function (err) {
                            if (err) throw err;
                            init();
                        }
                    )

                });
            }
        )
    });
}


function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "new_department",
        message: "What is the new department name."
    }).then(function (answer) {
        connection.query("INSERT INTO department SET ?",
            {
                name: answer.new_department
            },
            function (err) {
                if (err) throw err;
                console.log("New department was added successfully!")
                init();
            });
    });
}