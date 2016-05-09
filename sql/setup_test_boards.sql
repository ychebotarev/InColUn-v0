DROP TABLE IF EXISTS `incolun`.`boards`;

CREATE TABLE IF NOT EXISTS `incolun`.`boards` (
  `userid` BIGINT UNSIGNED NOT NULL,
  `boardid` BIGINT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `created` DATETIME NOT NULL,
  `updated` DATETIME NOT NULL,
  `status` CHAR(1) NOT NULL,
  `shared` CHAR(1) NOT NULL,
  `saved` INT NOT NULL DEFAULT 0,
  `kudos` INT NOT NULL DEFAULT 0,
  `json_blob` JSON NULL,
  PRIMARY KEY (`userid`, `boardid`))
ENGINE = InnoDB;

INSERT INTO incolun.boards (userid,boardid,title, created,updated, status,shared) 
   VALUES 
   (0, 0, 'Statistic and machine learning',NOW(),NOW(),'A','P'),
   (0, 1, 'Misc',NOW(),NOW(),'A','P'),
   (0, 2, 'Javascript',NOW(),NOW(),'A','P'),
   (0, 3, 'Really really really really really long long long tiiiiiiitle',NOW(),NOW(),'A','P'),
   (0, 4, 'Javascript on UX',NOW(),NOW(),'A','P');

select * from incolun.boards;