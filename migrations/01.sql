create table player(
    id serial primary key,
    name text,
    age int,
    email text,
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

create table game_session(
    id serial primary key,
    score int,
    game_id int references game,
    player_id int references player,
    created_at date,
    updated_at date,
    deleted_at date
);
