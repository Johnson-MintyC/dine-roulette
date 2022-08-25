\i schema.sql

ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE locations_id_seq RESTART WITH 1;
ALTER SEQUENCE categories_id_seq RESTART WITH 1;
ALTER SEQUENCE queries_id_seq RESTART WITH 1;

\i seed/users.sql
\i seed/locations.sql
\i seed/categories.sql