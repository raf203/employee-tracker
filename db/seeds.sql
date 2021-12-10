INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Pandora', 'Boxx', 1, 1),
  ('Manila', 'Luzon', 1, 1),
  ('Latrice', 'Royale', 2, 5),
  ('Jiggly', 'Caliente', 2, 3),
  ('Alisa', 'Summers', 3, 2),
  ('Alyssa', 'Edwards', 3, 4),
  ('Yvie', 'Oddly', 4, 3),
  ('Plastique', 'Tiara', 4, 3),
  ('Gigi', 'Goode', 5, 2),

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Singer', 3000, 1),
  ('Performer', 3500, 3),
  ('Actress', 3800, 1),
  ('Dancer', 2200, 2),
  ('Comedian', 4000, 4);

  INSERT INTO department (id, name)
VALUES
  (1, 'Glamour'),
  (2, 'Beauty'),
  (3, 'Talent'),
  (4, 'Fierce'),
  (5, 'Power');