CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"first_name" varchar(100),
	"last_name" varchar(100),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
