
INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('HR');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Executive', 70000.00, 1),
       ('Software Engineer', 90000.00, 2),
       ('Senior Software Engineer', 120000.00, 2),
       ('Accountant', 60000.00, 3),
       ('HR Manager', 80000.00, 4);

       INSERT INTO employee (first_name, last_name, role_id)
VALUES ('John', 'Doe', 1),
       ('Jane', 'Smith', 2),
       ('Robert', 'Johnson', 3),
       ('Emily', 'Davis', 4),
       ('William', 'Brown', 5);

       UPDATE employee
SET manager_id = 1
WHERE id BETWEEN 2 AND 5;