DROP TABLE IF EXISTS `incolun`.`users`;

CREATE TABLE IF NOT EXISTS `incolun`.`users` (
  `id` INT UNSIGNED NOT NULL,
  `userid` INT NOT NULL,
  `user_provided_id` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `username` VARCHAR(255) NULL,
  `pwd` VARCHAR(255) NULL,
  `token` VARCHAR(255) NULL,
  `type` CHAR(1) NULL,
  `created` DATETIME NULL,
  `status` CHAR(1) NULL,
  PRIMARY KEY (`id`, `userid`))
ENGINE = InnoDB

INSERT INTO incolun.users (id,userid,user_provided_id, email,username, pwd,token,type,created,status) 
   VALUES (0, '1372734638','a@a','a@a','a','2ebb8efcaa00598520e7b4fdc7d3a6630bcb13f0','NA','L',NOW(),'A')
   
SELECT * FROM incolun.users;