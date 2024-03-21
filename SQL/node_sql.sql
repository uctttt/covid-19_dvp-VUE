# Host: localhost  (Version: 5.7.26)
# Date: 2023-05-29 12:37:10
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "users"
#

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(25) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(18) NOT NULL DEFAULT '' COMMENT '用户密码',
  `name` varchar(15) DEFAULT NULL COMMENT '用户昵称',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='用户信息';

#
# Data for table "users"
#

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','123456','管理员');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
