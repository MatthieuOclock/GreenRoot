-- SQLBook: Code
BEGIN;

DROP TABLE IF EXISTS "order" CASCADE;

DROP TABLE IF EXISTS "tree" CASCADE;

DROP TABLE IF EXISTS "campain" CASCADE;

DROP TABLE IF EXISTS "user" CASCADE;

CREATE TABLE "user" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

CREATE TABLE "campain" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "date_begin" DATE NOT NULL,
    "date_end" DATE,
    "picture" TEXT NOT NULL,
    "user_id" INTEGER REFERENCES "user" ("id") ON DELETE CASCADE NOT NULL
);

CREATE TABLE "tree" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "race" TEXT NOT NULL,
    "price" DECIMAL(10, 2),
    "description" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "campain_id" INTEGER REFERENCES "campain" ("id") ON DELETE CASCADE,
    "user_id" INTEGER REFERENCES "user" ("id") ON DELETE CASCADE NOT NULL
);

CREATE TABLE "order" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "order_date" DATE NOT NULL DEFAULT NOW(),
    "status" TEXT NOT NULL,
    "total" DECIMAL(10, 2),
    "plantation_date" DATE,
    "tree_id" INTEGER REFERENCES "tree" ("id") ON DELETE CASCADE NOT NULL,
    "user_id" INTEGER REFERENCES "user" ("id") ON DELETE CASCADE NOT NULL
);

COMMIT;