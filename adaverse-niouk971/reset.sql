-- Supprimer les tables dans le bon ordre (car elles ont des FK entre elles)
DROP TABLE IF EXISTS students_projects CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS promotions CASCADE;

-- Supprimer aussi l'ENUM pour éviter l'erreur "type already exists"
DROP TYPE IF EXISTS project_category CASCADE;