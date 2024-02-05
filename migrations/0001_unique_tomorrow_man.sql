CREATE TABLE `wares` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`category_path` bigint unsigned NOT NULL,
	`name` varchar(256) NOT NULL,
	`price($)` int unsigned NOT NULL,
	`discount(%)` int unsigned,
	CONSTRAINT `wares_id` PRIMARY KEY(`id`)
);
