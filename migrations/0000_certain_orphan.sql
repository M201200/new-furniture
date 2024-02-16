CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(2048),
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`code` bigint unsigned NOT NULL,
	`en` varchar(64) NOT NULL,
	`ro` varchar(64) NOT NULL,
	`ru` varchar(64) NOT NULL,
	`layer` tinyint unsigned NOT NULL,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_code_unique` UNIQUE(`code`),
	CONSTRAINT `code_idx` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `characteristics_furniture` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`vendor_code` varchar(64) NOT NULL,
	`1-color` varchar(32) NOT NULL,
	`2-material` varchar(32) NOT NULL,
	`3-width(sm)` smallint unsigned NOT NULL,
	`4-height(sm)` smallint unsigned NOT NULL,
	`5-depth(sm)` smallint unsigned NOT NULL,
	`6-weight(kg)` smallint unsigned NOT NULL,
	`7-folding` boolean NOT NULL,
	`8-warranty(month)` tinyint unsigned NOT NULL,
	CONSTRAINT `characteristics_furniture_id` PRIMARY KEY(`id`),
	CONSTRAINT `characteristics_furniture_vendor_code_unique` UNIQUE(`vendor_code`),
	CONSTRAINT `vendor_code_idx` UNIQUE(`vendor_code`)
);
--> statement-breakpoint
CREATE TABLE `items` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`category_code` bigint unsigned NOT NULL,
	`serial_number` bigint unsigned NOT NULL,
	`variation` varchar(32) NOT NULL DEFAULT 'base',
	`vendor_code` varchar(64) AS (concat_ws("/", category_code, serial_number, variation)),
	`amount` int unsigned NOT NULL,
	`price($)` int unsigned NOT NULL,
	`discount(%)` tinyint unsigned NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `items_id` PRIMARY KEY(`id`),
	CONSTRAINT `vendor_code_compound_idx` UNIQUE(`category_code`,`serial_number`,`variation`),
	CONSTRAINT `vendor_code_idx` UNIQUE(`vendor_code`)
);
--> statement-breakpoint
CREATE TABLE `items_description` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`vendor_code` varchar(64) NOT NULL,
	`en` text NOT NULL,
	`ro` text NOT NULL,
	`ru` text NOT NULL,
	CONSTRAINT `items_description_id` PRIMARY KEY(`id`),
	CONSTRAINT `items_description_vendor_code_unique` UNIQUE(`vendor_code`),
	CONSTRAINT `vendor_code_idx` UNIQUE(`vendor_code`)
);
--> statement-breakpoint
CREATE TABLE `item_image_URLs` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`vendor_code` varchar(64) NOT NULL,
	`url` varchar(2083) NOT NULL,
	`is_thumbnail` boolean NOT NULL DEFAULT true,
	`notes` varchar(128),
	CONSTRAINT `item_image_URLs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `items_name` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`vendor_code` varchar(64) NOT NULL,
	`en` varchar(128) NOT NULL,
	`ro` varchar(128) NOT NULL,
	`ru` varchar(128) NOT NULL,
	CONSTRAINT `items_name_id` PRIMARY KEY(`id`),
	CONSTRAINT `items_name_vendor_code_unique` UNIQUE(`vendor_code`),
	CONSTRAINT `vendor_code_idx` UNIQUE(`vendor_code`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT (now()),
	`image` varchar(255),
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE INDEX `vendor_code_idx` ON `item_image_URLs` (`vendor_code`);--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;