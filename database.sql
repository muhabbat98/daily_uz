create extension pgcrypto;


-- varchar(n) = character varying(n) if shorter then declered length simply store shorter string
-- char(n) = character(n) if shorter then declered length space-padded

create table users(
    user_id serial not null unique primary key,
    username varchar(16) unique not null,
    password varchar(72) not null
);
DROP TABLE IF EXISTS images CASCADE;
create table images(
    image_id serial not null unique primary key,
    path varchar not null
);
DROP TABLE IF EXISTS expense CASCADE;
create table expense (
    expense_id serial not null unique primary key,
    expense_name varchar(32) unique not null,
    user_id int references users(user_id),
    image_id int references images(image_id)
);

-- numeric type slow but we can define with items with exact numeric(precision, scale)
DROP TABLE IF EXISTS expense_item;
create table expense_item (
    expense_item_id serial not null unique primary key,
    expense_id int references expense(expense_id),
    item_name varchar(64)not null,
    cost numeric(6,3) not null,
    buyed_at timestamptz not null default current_timestamp 
);