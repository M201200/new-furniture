CREATE TABLE `orders` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_email` varchar(255) NOT NULL,
	`item_vendor_code` varchar(64) NOT NULL,
	`amount` smallint unsigned NOT NULL,
	`purchase_time` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `user_email` ON `orders` (`user_email`);