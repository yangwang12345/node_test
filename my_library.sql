/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : my_library

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2017-03-27 10:23:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(255) NOT NULL,
  `psw` char(255) NOT NULL,
  `email` char(255) NOT NULL,
  `admin` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'user1', '123', '123@qq.com', '1');
INSERT INTO `user` VALUES ('2', 'user2', '123', '456@qq.com', '0');
