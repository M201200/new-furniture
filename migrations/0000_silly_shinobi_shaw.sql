CREATE TABLE `accessories` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `accessories_id` PRIMARY KEY(`id`),
	CONSTRAINT `accessories_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
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
CREATE TABLE `books` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `books_id` PRIMARY KEY(`id`),
	CONSTRAINT `books_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `clothes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `clothes_id` PRIMARY KEY(`id`),
	CONSTRAINT `clothes_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `clothes_for_children` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `clothes_for_children_id` PRIMARY KEY(`id`),
	CONSTRAINT `clothes_for_children_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `clothes_for_men` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `clothes_for_men_id` PRIMARY KEY(`id`),
	CONSTRAINT `clothes_for_men_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `clothes_for_women` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `clothes_for_women_id` PRIMARY KEY(`id`),
	CONSTRAINT `clothes_for_women_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `clothes_unisex` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `clothes_unisex_id` PRIMARY KEY(`id`),
	CONSTRAINT `clothes_unisex_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `comics` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `comics_id` PRIMARY KEY(`id`),
	CONSTRAINT `comics_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `computers` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `computers_id` PRIMARY KEY(`id`),
	CONSTRAINT `computers_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `educational_literature` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `educational_literature_id` PRIMARY KEY(`id`),
	CONSTRAINT `educational_literature_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `electronics` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `electronics_id` PRIMARY KEY(`id`),
	CONSTRAINT `electronics_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `fiction` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `fiction_id` PRIMARY KEY(`id`),
	CONSTRAINT `fiction_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `folders_and_files` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `folders_and_files_id` PRIMARY KEY(`id`),
	CONSTRAINT `folders_and_files_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `gaming_consoles` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `gaming_consoles_id` PRIMARY KEY(`id`),
	CONSTRAINT `gaming_consoles_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `headphones` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `headphones_id` PRIMARY KEY(`id`),
	CONSTRAINT `headphones_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `manga` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `manga_id` PRIMARY KEY(`id`),
	CONSTRAINT `manga_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `office_supplies` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `office_supplies_id` PRIMARY KEY(`id`),
	CONSTRAINT `office_supplies_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `paper` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `paper_id` PRIMARY KEY(`id`),
	CONSTRAINT `paper_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `paper_products` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `paper_products_id` PRIMARY KEY(`id`),
	CONSTRAINT `paper_products_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `phones` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `phones_id` PRIMARY KEY(`id`),
	CONSTRAINT `phones_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `shoes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `shoes_id` PRIMARY KEY(`id`),
	CONSTRAINT `shoes_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `shoes_for_children` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `shoes_for_children_id` PRIMARY KEY(`id`),
	CONSTRAINT `shoes_for_children_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `shoes_for_men` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `shoes_for_men_id` PRIMARY KEY(`id`),
	CONSTRAINT `shoes_for_men_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `shoes_for_women` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `shoes_for_women_id` PRIMARY KEY(`id`),
	CONSTRAINT `shoes_for_women_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `shoes_unisex` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `shoes_unisex_id` PRIMARY KEY(`id`),
	CONSTRAINT `shoes_unisex_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `stationery` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `stationery_id` PRIMARY KEY(`id`),
	CONSTRAINT `stationery_en_unique` UNIQUE(`en`)
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
CREATE TABLE `video_equipment` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `video_equipment_id` PRIMARY KEY(`id`),
	CONSTRAINT `video_equipment_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
CREATE TABLE `writing_supplies` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`en` varchar(64),
	`ro` varchar(64),
	`ru` varchar(64),
	CONSTRAINT `writing_supplies_id` PRIMARY KEY(`id`),
	CONSTRAINT `writing_supplies_en_unique` UNIQUE(`en`)
);
--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;