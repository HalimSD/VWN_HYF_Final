SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `vwn` DEFAULT CHARACTER SET utf8 ;
USE `vwn` ;

CREATE TABLE IF NOT EXISTS `vwn`.`org` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` TINYINT(4) NOT NULL DEFAULT 1,
  `approved` TINYINT(4) NOT NULL DEFAULT 1,
  `logo` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `web` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `org_id` int(11) NOT NULL,
  `post_code` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `house_number` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`,`org_id`),
  KEY `fk_contact_org_idx` (`org_id`),
  CONSTRAINT `fk_contact_org` FOREIGN KEY (`org_id`) REFERENCES `org` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2054 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `vwn`.`tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `vwn`.`region` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `vwn`.`org_has_tag` (
  `tag_id` INT NOT NULL,
  `org_id` INT NOT NULL,
  PRIMARY KEY (`tag_id`, `org_id`),
  INDEX `fk_tag_has_org_org1_idx` (`org_id` ASC),
  INDEX `fk_tag_has_org_tag1_idx` (`tag_id` ASC),
  CONSTRAINT `fk_tag_has_org_tag1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `vwn`.`tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tag_has_org_org1`
    FOREIGN KEY (`org_id`)
    REFERENCES `vwn`.`org` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `vwn`.`org_has_region` (
  `region_id` INT NOT NULL,
  `org_id` INT NOT NULL,
  PRIMARY KEY (`region_id`, `org_id`),
  INDEX `fk_region_has_org_org1_idx` (`org_id` ASC),
  INDEX `fk_region_has_org_region1_idx` (`region_id` ASC),
  CONSTRAINT `fk_tag_has_org_region1`
    FOREIGN KEY (`region_id`)
    REFERENCES `vwn`.`region` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_region_has_org_org1`
    FOREIGN KEY (`org_id`)
    REFERENCES `vwn`.`org` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `vwn`.`admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
