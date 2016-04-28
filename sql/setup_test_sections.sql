DROP TABLE IF EXISTS `incolun`.`sections`;

CREATE TABLE IF NOT EXISTS `incolun`.`sections` (
  `boardid` BIGINT UNSIGNED NOT NULL,
  `id` BIGINT NOT NULL,
  `parentid` BIGINT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `created` DATETIME NOT NULL,
  `updated` DATETIME NOT NULL,
  `status` CHAR(1) NOT NULL,
  `json_blob` JSON NULL,
  PRIMARY KEY (`boardid`, `id`))
ENGINE = InnoDB;

INSERT INTO incolun.sections (boardid,id, parentid, title, created,updated, status) 
   VALUES (0, 0, 0, 'board 0 section1',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (0, 1, 0, 'board 0 section2',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (0, 2, 1, 'board 0 section3',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (0, 3, 2, 'board 0 section4',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (0, 4, 3, 'board 0 section5',NOW(),NOW(),'A');

INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (1, 10, 1, 'board 1 section1',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (1, 11, 1, 'board 1 section2',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (1, 12, 1, 'board 1 section3',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (1, 13, 1, 'board 1 section4',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (1, 14, 1, 'board 1 section5',NOW(),NOW(),'A');

INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (2, 20, 2, 'board 2 section1',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (2, 21, 2, 'board 2 section2',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (2, 22, 2, 'board 2 section3',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (2, 23, 2, 'board 2 section4',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (2, 24, 2, 'board 2 section5',NOW(),NOW(),'A');

INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (3, 30, 3, 'board 3 section1',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (3, 31, 3, 'board 3 section2',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (3, 32, 3, 'board 3 section3',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (3, 33, 3, 'board 3 section4',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (3, 34, 3, 'board 3 section5',NOW(),NOW(),'A');

INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (4, 40, 4, 'board 4 section1',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (4, 41, 4, 'board 4 section2',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (4, 42, 4, 'board 4 section3',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (4, 43, 4, 'board 4 section4',NOW(),NOW(),'A');
INSERT INTO incolun.sections (boardid,id,title, created,updated, status) 
   VALUES (4, 44, 4, 'board 4 section5',NOW(),NOW(),'A');
   
select * from incolun.sections
