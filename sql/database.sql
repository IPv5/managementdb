DROP DATABASE IF EXISTS management_db;
CREATE DATABASE management_db;
USE management_db;
-- Create the table actors.
CREATE TABLE department (
id int AUTO_INCREMENT,
name varchar(30) NOT NULL,
PRIMARY KEY(id)
);
CREATE TABLE role (
id int AUTO_INCREMENT,
title varchar(30) NOT NULL,
salary decimal NOT NULL,
department_id int NOT NULL,
PRIMARY KEY(id)
);
CREATE TABLE employee (
id int AUTO_INCREMENT,
first_name varchar(30) NOT NULL,
last_name varchar(30) NOT NULL,
role_id int NOT NULL,
manager_id int,
PRIMARY KEY(id)
);

-- Insert a set of records.
-- INSERT INTO actors (name, coolness_points, attitude) VALUES ("Jerry", 90, "relaxed");
-- INSERT INTO actors (name, coolness_points, attitude) VALUES ("Elaine", 80, "righteous");
-- INSERT INTO actors (name, coolness_points, attitude) VALUES ("Kramer", 20, "doofus");
-- INSERT INTO actors (name, coolness_points, attitude) VALUES ("George", 70, "selfish");