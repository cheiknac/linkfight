BEGIN;


INSERT INTO "users" (firstname, lastname, email, password, type, birthday, address, zip_code, city, avatar, legals)
VALUES
('John', 'Doe', 'john.doe@example.com', 'password123', 'sponsor', '1990-01-01', '123 Main St', '12345', 'New York', 'johndoe.jpg', true),
('Jane', 'Smith', 'jane.smith@example.com', 'password456', 'media', '1992-05-15', '456 Oak Ave', '67890', 'Los Angeles', 'janesmith.jpg', true),
('Luc', 'Neo', 'lneo@example.com', 'password560', 'sportif', '1995-09-27', '10 rue du bac', '75000', 'Paris', 'jleo.jpg', true);

INSERT INTO "sponsor" (id_user, company_name, position, phone)
VALUES
(1, 'Safran', 'CEO', '0634345454');

INSERT INTO "media" (id_user, media_name, position, phone)
VALUES
(2, 'france24', 'marketing manager', '0634345454');

INSERT INTO "sportprofil" (id_user, biography, categorie, discipline, club, zipcode_club, victory, defeat, weight, instagram, tiktok, snapchat)
VALUES
(3, 'Combatant pro depuis 2015, jaime le sport','lourd', 'jjb', 'jjb75', '75000', 10, 0, 85.4, 'https://www.instagram.com/macbook', 'https://tiktok.com/123', 'https://snapchat.com/123');

INSERT INTO "palmares" (id_sportprofil, title, discipline, city, country, date, result)
VALUES
(3, 'Tournois du cenacles', 'jjb', 'Toulouse', 'France', '2022-05-11', 'victoire par ko');

INSERT INTO "images" (id_sportprofil, url)
VALUES
(3, 'https://www.ffst-multisports.com/lesSports/commissions/jiuJitsuBresilien/index.html'),
(3, 'https://www.ffst-multisports.com/lesSports/commissions/jiuJitsuBresilien/index.html'),
(3, 'https://www.ffst-multisports.com/lesSports/commissions/jiuJitsuBresilien/index.html'),
(3, 'https://www.ffst-multisports.com/lesSports/commissions/jiuJitsuBresilien/index.html'),
(3, 'https://www.ffst-multisports.com/lesSports/commissions/jiuJitsuBresilien/index.html'),
(3, 'https://www.ffst-multisports.com/lesSports/commissions/jiuJitsuBresilien/index.html');


COMMIT;