CREATE DATABASE to_do_app;

USE to_do_app;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    is_finished BOOLEAN DEFAULT false,
    task_index INT DEFAULT 0
);