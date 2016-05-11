CREATE SCHEMA `incolun`;

DROP TABLE IF EXISTS `incolun`.`users`;

CREATE TABLE IF NOT EXISTS `incolun`.`users` (
  `id` BIGINT UNSIGNED NOT NULL,
  `profile_id` INT UNSIGNED NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `type` ENUM('L', 'F', 'G') NOT NULL,
  `created` DATETIME NOT NULL DEFAULT NOW(),
  `status` ENUM('N', 'A', 'D') NOT NULL DEFAULT 'N',
  `kudos` INT UNSIGNED NULL DEFAULT 0,
  `json_blob` JSON NULL,
  PRIMARY KEY (`id`, `profile_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;

INSERT INTO incolun.users (id,profile_id, username, email, password, type) 
   VALUES (0, '1372734638','a','a@a','2ebb8efcaa00598520e7b4fdc7d3a6630bcb13f0','L');

INSERT INTO incolun.users (id,profile_id, username, email, password, type) 
   VALUES (1, '4232722471','b','b@b','5ece1dc5bb7a19d0d5d8dc670a582519f5f3170a','L');
   
SELECT * FROM incolun.users;
SELECT * from incolun.users WHERE user_id_key = '1372734638';

DELETE from incolun.users WHERE user_id_key=4232722471;
DELETE from incolun.users WHERE user_id_key=834624741;
                   