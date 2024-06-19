create table player(
    id serial primary key,
    name text,
    age int,
    email text,
    password text,
    created_at date,
    updated_at date,
    deleted_at date
);

create table game(
    id serial primary key,
    status text,
    max_players int,
    created_at date,
    updated_at date,
    deleted_at date
);

create table card(
    id serial primary key,
    game_id int references game,
    value text,
    color text,
    created_at date,
    updated_at date,
    deleted_at date
);

create table game_session(
    id serial primary key,
    game_id int references game,
    player_id int references player,
    score int,
    created_at date,
    updated_at date,
    deleted_at date
);
