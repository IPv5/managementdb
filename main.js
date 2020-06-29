const inquirer = require("inquirer");
const view = require("./js/viewing");
const add = require("./js/add");
const del = require("./js/delete");


function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add department, roles and employees",
                "View departments, roles and employees",
                "Delete employee roles"
            ]
        }).then(function(answer) {
            switch (answer.action) {
                case "Add department, roles and employees":
                    add.addEmployeeInformation();
                    break;

                case "View departments, roles and employees":
                    view.viewEmployeeInformation();
                    break;

                case "Delete employee roles":
                    del.delEmployeeInformation();
                    break;
            }
        });
}

function artistSearch() {
    inquirer
        .prompt({
            name: "artist",
            type: "input",
            message: "What artist would you like to search for?"
        })
        .then(function(answer) {
            var query = "SELECT position, song, year FROM top5000 WHERE ?";
            connection.query(query, { artist: answer.artist }, function(err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
                }
                runSearch();
            });
        });
}

function multiSearch() {
    var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].artist);
        }
        runSearch();
    });
}

function rangeSearch() {
    inquirer
        .prompt([{
                name: "start",
                type: "input",
                message: "Enter starting position: ",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "end",
                type: "input",
                message: "Enter ending position: ",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function(answer) {
            var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
            connection.query(query, [answer.start, answer.end], function(err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log(
                        "Position: " +
                        res[i].position +
                        " || Song: " +
                        res[i].song +
                        " || Artist: " +
                        res[i].artist +
                        " || Year: " +
                        res[i].year
                    );
                }
                runSearch();
            });
        });
}


function songAndAlbumSearch() {
    inquirer
        .prompt({
            name: "artist",
            type: "input",
            message: "What artist would you like to search for?"
        })
        .then(function(answer) {
            var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
            query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
            query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";

            connection.query(query, [answer.artist, answer.artist], function(err, res) {
                console.log(res.length + " matches found!");
                for (var i = 0; i < res.length; i++) {
                    console.log(
                        i + 1 + ".) " +
                        "Year: " +
                        res[i].year +
                        " Album Position: " +
                        res[i].position +
                        " || Artist: " +
                        res[i].artist +
                        " || Song: " +
                        res[i].song +
                        " || Album: " +
                        res[i].album
                    );
                }

                runSearch();
            });
        });
}


module.exports.runSearch = runSearch;