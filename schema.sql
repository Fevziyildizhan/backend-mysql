CREATE DATABASE crud_app;
USE crud_app;

CREATE TABLE crud (
  id integer PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  contents TEXT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO crud (title, contents)
VALUES 
('My First Note', 'A note about something'),
('My Second Note', 'A note about something else');