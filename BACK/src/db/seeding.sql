BEGIN;

TRUNCATE TABLE "order" RESTART IDENTITY CASCADE;

TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;

INSERT INTO
    "user" (
        "last_name",
        "first_name",
        email,
        phone,
        "role",
        "password"
    )
VALUES (
        'Smith',
        'John',
        'john.smith@example.com',
        '+1234567890',
        'admin',
        '1234'
    ),
    (
        'Johnson',
        'Emma',
        'emma.johnson@example.com',
        '+1987654321',
        'partenaire',
        'jackydu93'
    ),
    (
        'Williams',
        'Michael',
        'michael.williams@example.com',
        '+1122334455',
        'user',
        'emiledu92'
    ),
    (
        'Brown',
        'Emily',
        'emily.brown@example.com',
        '+1555555555',
        'user',
        'kassimdu13'
    ),
    (
        'Jones',
        'Daniel',
        'daniel.jones@example.com',
        '+1444444444',
        'chef de projet',
        'chocolatine'
    ),
    (
        'Jones',
        'Daniel',
        'daniel.jon@example.com',
        '+1444444444',
        'chef de projet',
        'chocolatine'
    );

INSERT INTO
    "campain" (
        name,
        place,
        date_begin,
        date_end,
        picture,
        "user_id"
    )
VALUES (
        'Campagne de printemps',
        'Paris',
        '2024-03-01',
        '2024-04-30',
        'images/spring_campaign.webp',
        1
    ),
    (
        'Campagne de baba',
        'Londres',
        '2024-06-01',
        '2024-08-31',
        'images/summer_campaign.webp',
        2
    ),
    (
        'Campagne d automne',
        'New York',
        '2024-09-01',
        '2024-11-30',
        'images/autumn_campaign.webp',
        3
    ),
    (
        'Campagne d hiver',
        'Tokyo',
        '2024-12-01',
        '2025-02-28',
        'images/winter_campaign.webp',
        4
    ),
    (
        'Campagne de toto',
        'Tokyo',
        '2024-12-01',
        '2025-02-28',
        'images/winter_campaign.webp',
        5
    ),
    (
        'Campagne de toto',
        'Tokyo',
        '2024-12-01',
        '2025-02-28',
        'images/winter_campaign.webp',
        6
    );

INSERT INTO
    "tree" (
        race,
        price,
        description,
        picture,
        status,
        "user_id"
    )
VALUES (
        'Chêne rouge',
        50.00,
        'Arbre à feuilles caduques originaire d''Amérique du Nord.',
        'images/red_oak.webp',
        'Disponible',
        1
    ),
    (
        'Érable du Japon',
        80.50,
        'Arbre ornemental apprécié pour ses couleurs automnales.',
        'images/japanese_maple.webp',
        'Disponible',
        2
    ),
    (
        'Sapin de Nordmann',
        65.75,
        'Arbre de Noël populaire pour sa forme régulière et son feuillage dense.',
        'images/nordmann_fir.webp',
        'Réservé',
        3
    ),
    (
        'Cerisier à fleurs',
        45.00,
        'Arbre à fleurs spectaculaires au printemps.',
        'images/cherry_blossom.webp',
        'Disponible',
        4
    ),
    (
        'Saule pleureur',
        60.00,
        'Arbre au port pleureur et aux feuilles caduques.',
        'images/weeping_willow.webp',
        'En attente',
        5
    ),
    (
        'Chêne rouge',
        50.00,
        'Arbre à feuilles caduques originaire d''Amérique du Nord.',
        'images/red_oak.webp',
        'Disponible',
        6
    );

INSERT INTO
    "order" (
        order_date,
        status,
        total,
        "plantation_date",
        "tree_id",
        "user_id"
    )
VALUES (
        '2024-05-01',
        'En cours',
        150.50,
        '2024-05-01',
        1,
        1
    ),
    (
        '2024-05-03',
        'Livre',
        280.20,
        '2024-05-01',
        2,
        2
    ),
    (
        '2024-05-05',
        'En cours',
        75.00,
        '2024-05-01',
        3,
        3
    ),
    (
        '2024-05-07',
        'En cours',
        420.75,
        '2024-05-01',
        4,
        4
    ),
    (
        '2024-05-10',
        'En cours',
        200.00,
        '2024-05-01',
        5,
        5
    ),
    (
        '2024-05-10',
        'En cours',
        200.00,
        '2024-05-01',
        6,
        6
    );

COMMIT;