DROP TABLE IF EXISTS `incolun`.`boards`;
DROP TABLE IF EXISTS `incolun`.`userboards`;
DROP TABLE IF EXISTS `incolun`.`opened`;
DROP TABLE IF EXISTS `incolun`.`recent`;


CREATE TABLE IF NOT EXISTS `incolun`.`boards` (
  `boardid` BIGINT NOT NULL,
  `parentid` BIGINT,
  `title` VARCHAR(255) NOT NULL,
  `created` DATETIME NOT NULL,
  `updated` DATETIME NOT NULL,
  `status` CHAR(1) NOT NULL,
  `json_blob` JSON NULL,
  PRIMARY KEY (`boardid`))
ENGINE = InnoDB;
/*
status:
P - private
S - shared
O - open
*/

CREATE TABLE IF NOT EXISTS `incolun`.`userboards` (
  `userid` BIGINT UNSIGNED NOT NULL,
  `boardid` BIGINT UNSIGNED NOT NULL,
  `CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `sakila`.`film_list` AS select `sakila`.`film`.`film_id` AS `FID`,`sakila`.`film`.`title` AS `title`,`sakila`.`film`.`description` AS `description`,`sakila`.`category`.`name` AS `category`,`sakila`.`film`.`rental_rate` AS `price`,`sakila`.`film`.`length` AS `length`,`sakila`.`film`.`rating` AS `rating`,group_concat(concat(`sakila`.`actor`.`first_name`,_utf8' ',`sakila`.`actor`.`last_name`) separator ', ') AS `actors` from ((((`sakila`.`category` left join `sakila`.`film_category` on((`sakila`.`category`.`category_id` = `sakila`.`film_category`.`category_id`))) left join `sakila`.`film` on((`sakila`.`film_category`.`film_id` = `sakila`.`film`.`film_id`))) join `sakila`.`film_actor` on((`sakila`.`film`.`film_id` = `sakila`.`film_actor`.`film_id`))) join `sakila`.`actor` on((`sakila`.`film_actor`.`actor_id` = `sakila`.`actor`.`actor_id`))) group by `sakila`.`film`.`film_id`,`sakila`.`category`.`name`;
` CHAR(1) NOT NULL, 
  `timestamp` DATETIME NOT NULL,
  `json_blob` JSON NULL,
  PRIMARY KEY (`userid`, `boardid`))
ENGINE = InnoDB;

/*
relation:
O - owner
V - viewer
C - contributer
S - saved (saved public board)
*/

CREATE TABLE IF NOT EXISTS `incolun`.`opened` (
  `userid` BIGINT UNSIGNED NOT NULL,
  `boardid` BIGINT UNSIGNED NOT NULL,
  `timestamp` DATETIME NOT NULL,
  `json_blob` JSON NULL,
  PRIMARY KEY (`userid`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `incolun`.`recent` (
  `userid` BIGINT UNSIGNED NOT NULL,
  `boardid` BIGINT UNSIGNED NOT NULL,
  `timestamp` DATETIME NOT NULL,
  `json_blob` JSON NULL,
  PRIMARY KEY (`userid`))
ENGINE = InnoDB;

INSERT INTO incolun.boards (boardid, parentid, title, created,updated, status) 
   VALUES 
   (0, NULL, 'Statistic and machine learning',NOW(),NOW(), 'P'),
   (1, 0, 'board 0 section1',NOW(),NOW(),'P'),
   (2, 1, 'board 0 section1',NOW(),NOW(),'P'),
   (3, 2, 'board 0 section1',NOW(),NOW(),'P'),
   (4, 3, 'board 0 section1',NOW(),NOW(),'P'),
   
   (10, NULL, 'Misc', NOW(),NOW(),'P'),
   (11, 10, 'board 1 section2',NOW(),NOW(),'P'),
   (12, 10, 'board 1 section3',NOW(),NOW(),'P'),
   (13, 10, 'board 1 section4',NOW(),NOW(),'P'),
   (14, 11, 'board 1 section5',NOW(),NOW(),'P'),
   
   (20, NULL, 'Working with Typescript and VS code', NOW(),NOW(),'P'),
   (21, 20, 'board 2 section2',NOW(),NOW(),'P'),
   (22, 20, 'board 2 section3',NOW(),NOW(),'P'),
   (23, 20, 'board 2 section4',NOW(),NOW(),'P'),
   (24, 20, 'board 2 section5',NOW(),NOW(),'P'),
   
   
   (30, NULL, 'TODO', NOW(),NOW(),'P'),
   (31, 30, 'board 3 section2',NOW(),NOW(),'P'),
   (32, 31, 'board 3 section3',NOW(),NOW(),'P'),
   (33, 31, 'board 3 section4',NOW(),NOW(),'P'),
   (34, 31, 'board 3 section5',NOW(),NOW(),'P'),
   (31, 31, 'board 3 section6',NOW(),NOW(),'P'),
   (32, 31, 'board 3 section7',NOW(),NOW(),'P'),
   (33, 31, 'board 3 section8',NOW(),NOW(),'P'),
   (34, 30, 'board 3 section9',NOW(),NOW(),'P'),

   (40, NULL, 'Paris planning', NOW(),NOW(),'S'),
   (41, 40, 'board 4 section2',NOW(),NOW(),'P'),
   (42, 41, 'board 4 section3',NOW(),NOW(),'P'),
   (43, 41, 'board 4 section4',NOW(),NOW(),'P'),
   (44, 42, 'board 4 section5',NOW(),NOW(),'P'),

   (50, NULL, 'Really really really really really long long long tiiiiiiitle',NOW(),NOW(),'O'),
   (51, 50, 'board 5 section2',NOW(),NOW(),'P'),
   (52, 50, 'board 5 section3',NOW(),NOW(),'P'),
   (53, 52, 'board 5 section4',NOW(),NOW(),'P'),
   (54, 52, 'board 5 section5',NOW(),NOW(),'P');
   
select * from incolun.boards;  
select * from incolun.userboards;  

INSERT INTO incolun.userboards(userid, boardid, relation, timestamp)
	VALUES 
    (0, 0, 'O', NOW()),
    (0, 10, 'O', NOW()),
    (0, 20, 'O', NOW()),
    
    (1, 30, 'O', NOW()),
    (1, 40, 'O', NOW()),
    (1, 50, 'O', NOW()),
    
    (0, 30, 'C', NOW()),
    (0, 40, 'V', NOW()),
    (0, 50, 'S', NOW());
    
SELECT *
    
select * from incolun.userboards;  