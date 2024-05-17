CREATE TABLE "cities"(
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL
);
ALTER TABLE
    "cities" ADD PRIMARY KEY("id");
CREATE TABLE "countries"(
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL
);
ALTER TABLE
    "countries" ADD PRIMARY KEY("id");
ALTER TABLE
    "cities" ADD CONSTRAINT "cities_id_foreign" FOREIGN KEY("id") REFERENCES "countries"("id");