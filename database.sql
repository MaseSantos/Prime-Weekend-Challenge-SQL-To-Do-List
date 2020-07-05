CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"due_date" DATE,
	"task_name" VARCHAR(50) NOT NULL,	
	"description" VARCHAR(100) NOT NULL, 
	"urgency" INTEGER,
	"done" BOOLEAN
);