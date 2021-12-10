INSERT INTO departments (id, name)
VALUES
  (1, 'Sales'),
  (2, 'Marketing'),
  (3, 'Finance'),
  (4, 'Operations'),
  (5, 'HR');


INSERT INTO roles (title, salary, department_id)
VALUES
  ('Singer', 1500, 1),
  ('Dancer', 1800, 3),
  ('Performer', 2000, 1),
  ('Comedian', 2300, 2),
  ('Actress', 5000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Pandora', 'Boxx', 1, 1),
  ('Manila', 'Luzon', 2, 2),
  ('Latrice', 'Royale', 3, 3),
  ('Jiggly', 'Caliente', 4, 3),
  ('Alisa', 'Summers', 5, 2),
  ('Alyssa', 'Edwards', 4, 1),
  ('Yvie', 'Oddly', 4, 3),
  ('Plastique', 'Tiara', 5, 3),
  ('Gigi', 'Goode', 4, 2);