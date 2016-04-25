CREATE SCHEMA `incolun`;

DROP TABLE IF EXISTS `incolun`.`users`;


CREATE TABLE IF NOT EXISTS `incolun`.`users` (
  `id` BIGINT UNSIGNED NOT NULL,
  `user_id_key` INT UNSIGNED NOT NULL,
  `user_id` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `type` CHAR(1) NOT NULL,
  `created` DATETIME NOT NULL,
  `status` CHAR(1) NOT NULL,
  `kudos` INT UNSIGNED NOT NULL DEFAULT 0,
  `boards` INT UNSIGNED NOT NULL DEFAULT 0,
  `saved_boards` INT UNSIGNED NOT NULL DEFAULT 0,
  `json_blob` JSON NULL,
  PRIMARY KEY (`id`, `user_id_key`))
ENGINE = InnoDB;


INSERT INTO incolun.users (id,user_id_key,user_id, email,username, password,token,type,created,status) 
   VALUES (0, '1372734638','a@a','a@a','a','2ebb8efcaa00598520e7b4fdc7d3a6630bcb13f0','NA','L',NOW(),'A');
   
SELECT * FROM incolun.users;

SELECT * from incolun.users WHERE user_id_key = '1372734638';