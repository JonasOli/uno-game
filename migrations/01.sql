create table player(
    id serial primary key,
    name text,
    email text,
    password text,
    created_at date,
    updated_at date,
    deleted_at date
);

create table game(
    id serial primary key,
    status text,
    created_at date,
    updated_at date,
    deleted_at date
);

create table game_cards(
    id serial primary key,
    game_id int references game,
    value text,
    card_type text,
    card_color text,
    created_at date
);

create table game_session(
    id serial primary key,
    game_id int references game,
    player_id int references player,
    score int,
    is_owner bool default false,
    created_at date,
    updated_at date,
    deleted_at date
);
