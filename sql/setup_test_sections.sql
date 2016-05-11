DROP TABLE IF EXISTS `incolun`.`notes`;

CREATE TABLE IF NOT EXISTS `incolun`.`notes` (
  `boardid` BIGINT NOT NULL,
  `parentid` BIGINT,
  `title` VARCHAR(255) NOT NULL,
  `created` DATETIME NOT NULL,
  `updated` DATETIME NOT NULL,
  `status` CHAR(1) NOT NULL,
  `json_blob` JSON NULL,
  PRIMARY KEY (`boardid`, `id`))
ENGINE = InnoDB;

INSERT INTO incolun.sections (boardid, parentid, title, created,updated, status) 
   VALUES (0, NULL, 'Statistic and machine learning',NOW(),NOW(),'A'),
   (1, 0, 'board 0 section1',NOW(),NOW(),'A'),
   (2, 1, 'board 0 section1',NOW(),NOW(),'A'),
   (3, 2, 'board 0 section1',NOW(),NOW(),'A'),
   (4, 3, 'board 0 section1',NOW(),NOW(),'A'),


   (10, 10, 'Misc',NOW(),NOW(),'A'),
   (11, 11, 'board 1 section2',NOW(),NOW(),'A'),
   (12, 12, 'board 1 section3',NOW(),NOW(),'A'),
   (13, 13, 'board 1 section4',NOW(),NOW(),'A'),
   (14, 14, 'board 1 section5',NOW(),NOW(),'A'),

   (20, 20, 'Javascript',NOW(),NOW(),'A'),
   (21, 21, 'board 2 section2',NOW(),NOW(),'A'),
   (22, 22, 'board 2 section3',NOW(),NOW(),'A'),
   (23, 23, 'board 2 section4',NOW(),NOW(),'A'),
   (24, 24, 'board 2 section5',NOW(),NOW(),'A'),

   (30, 30, 'Really really really really really long long long tiiiiiiitle',NOW(),NOW(),'A'),
   (31, 31, 'board 3 section2',NOW(),NOW(),'A'),
   (32, 32, 'board 3 section3',NOW(),NOW(),'A'),
   (33, 33, 'board 3 section4',NOW(),NOW(),'A'),
   (34, 34, 'board 3 section5',NOW(),NOW(),'A'),

   (40, 40, 'Javascript on UX',NOW(),NOW(),'A'),
   (41, 41, 'board 4 section2',NOW(),NOW(),'A'),
   (42, 42, 'board 4 section3',NOW(),NOW(),'A'),
   (43, 43, 'board 4 section4',NOW(),NOW(),'A'),
   (44, 44, 'board 4 section5',NOW(),NOW(),'A');
   
select * from incolun.sections
