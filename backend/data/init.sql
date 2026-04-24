
BEGIN;

DROP TABLE IF EXISTS "images", "palmares", "sportprofil", "media", "sponsor", "users" CASCADE;


-- ============================================================
-- init.sql — MLDLinks Fight
-- ============================================================
 
-- ============================================================
-- TABLE : USER
-- ============================================================
CREATE TABLE "users" (
    id            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname     VARCHAR(50)        NOT NULL,
    lastname      VARCHAR(50)        NOT NULL,
    email         VARCHAR(250) UNIQUE NOT NULL,
    password      VARCHAR(255)        NOT NULL,
    type          VARCHAR(20) NOT NULL CHECK (type IN ('sponsor', 'media', 'sportif')),
    birthday      DATE,
    address       VARCHAR(150),
    zip_code      VARCHAR(5) NOT NULL CHECK ( zip_code ~ '^\d{5}$'),
    city          VARCHAR(30),
    avatar        VARCHAR(250),
    legals        BOOLEAN DEFAULT FALSE,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMPTZ
);


 
-- ============================================================
-- TABLE : SPORT_PROFIL
-- ============================================================
CREATE TABLE "sportprofil" (
    id_user      INT PRIMARY KEY REFERENCES "users"(id) ON DELETE CASCADE,
    biography    TEXT,
    categorie    VARCHAR(100),
    discipline   VARCHAR(100),
    club         VARCHAR(150),
    zipcode_club VARCHAR(20),
    victory      INT DEFAULT 0,
    defeat       INT DEFAULT 0,
    weight       DECIMAL(5, 2),
    instagram    VARCHAR(255),
    tiktok       VARCHAR(255),
    snapchat     VARCHAR(255)
);
 
-- ============================================================
-- TABLE : PALMARES
-- ============================================================
CREATE TABLE "palmares" (
    id            INTEGER GENERATED ALWAYS AS IDENTITY,
    id_sportprofil INT NOT NULL REFERENCES sportprofil(id_user) ON DELETE CASCADE,
    title         VARCHAR(50) NOT NULL,
    discipline    VARCHAR(50),
    city          VARCHAR(30) NOT NULL,
    country       VARCHAR(30),
    date          DATE,
    result        VARCHAR(255),
    PRIMARY KEY (id, id_sportprofil)
);
 
-- ============================================================
-- TABLE : IMAGES
-- ============================================================
CREATE TABLE "images" (
    id_image      INTEGER GENERATED ALWAYS AS IDENTITY,
    id_sportprofil INT NOT NULL REFERENCES sportprofil(id_user) ON DELETE CASCADE,
    url           VARCHAR(500) NOT NULL,
    PRIMARY KEY (id_image, id_sportprofil)
);
 
-- ============================================================
-- TABLE : SPONSOR
-- ============================================================
CREATE TABLE "sponsor" (
    id_user      INT PRIMARY KEY REFERENCES "users"(id) ON DELETE CASCADE,
    company_name VARCHAR(50) NOT NULL,
    position     VARCHAR(50) NOT NULL,
    phone        VARCHAR(20) CHECK (phone ~ '^[0-9+ ]+$')
);
 
-- ============================================================
-- TABLE : MEDIA
-- ============================================================
CREATE TABLE "media" (
    id_user    INT  NOT NULL REFERENCES "users"(id) ON DELETE CASCADE,
    media_name VARCHAR(50) NOT NULL,
    position     VARCHAR(50) NOT NULL,
    phone        VARCHAR(20) CHECK (phone ~ '^[0-9+ ]+$'),
    PRIMARY KEY (id_user, media_name)
);


COMMIT;