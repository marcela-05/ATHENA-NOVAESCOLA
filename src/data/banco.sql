BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "professor" (
	"id_professor"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	"senha"	TEXT NOT NULL,
	"email"	TEXT NOT NULL,
	PRIMARY KEY("id_professor" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "disciplina" (
	"id_disciplina"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	PRIMARY KEY("id_disciplina" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "avaliacao" (
	"id_avaliacao"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	"data"	TEXT NOT NULL,
	"serie"	INTEGER NOT NULL,
	"id_professor"	INTEGER NOT NULL,
	PRIMARY KEY("id_avaliacao" AUTOINCREMENT),
	FOREIGN KEY("id_professor") REFERENCES "professor"("id_professor") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "area_conhecimento" (
	"id_area"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	"id_disciplina"	INTEGER NOT NULL,
	PRIMARY KEY("id_area" AUTOINCREMENT),
	FOREIGN KEY("id_disciplina") REFERENCES "disciplina"("id_disciplina") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "bloco_questao" (
	"id_avaliacao"	INTEGER NOT NULL,
	"num_bloco"	INTEGER NOT NULL,
	"quant_questoes"	INTEGER NOT NULL,
	"id_area"	INTEGER NOT NULL,
	PRIMARY KEY("id_avaliacao","num_bloco"),
	FOREIGN KEY("id_avaliacao") REFERENCES "avaliacao"("id_avaliacao"),
	FOREIGN KEY("id_area") REFERENCES "area_conhecimento"("id_area") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "prof_disciplina" (
	"id_professor"	INTEGER NOT NULL,
	"id_disciplina"	INTEGER NOT NULL,
	PRIMARY KEY("id_professor","id_disciplina"),
	FOREIGN KEY("id_disciplina") REFERENCES "disciplina"("id_disciplina") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("id_professor") REFERENCES "professor"("id_professor") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "nota" (
	"id_aluno"	INTEGER NOT NULL,
	"id_avaliacao"	INTEGER NOT NULL,
	"num_bloco"	INTEGER NOT NULL,
	"nota_acertos"	INTEGER NOT NULL,
	"data"	TEXT NOT NULL,
	PRIMARY KEY("id_aluno","id_avaliacao","num_bloco","nota_acertos"),
	FOREIGN KEY("id_avaliacao") REFERENCES "avaliacao"("id_avaliacao") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("num_bloco") REFERENCES "bloco_questao"("num_bloco") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("id_aluno") REFERENCES "aluno"("id_aluno") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "aluno" (
	"id_aluno"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	"serie"	INTEGER NOT NULL,
	"id_professor"	INTEGER NOT NULL,
	FOREIGN KEY("id_professor") REFERENCES "professor"("id_professor") ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY("id_aluno" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "aluno_turma" (
	"id_aluno"	INTEGER NOT NULL,
	"id_turma"	INTEGER NOT NULL,
	FOREIGN KEY("id_turma") REFERENCES "turma"("id_turma") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("id_aluno") REFERENCES "aluno"("id_aluno") ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY("id_aluno","id_turma")
);
CREATE TABLE IF NOT EXISTS "turma" (
	"id_turma"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	"serie"	INTEGER NOT NULL,
	"id_professor"	INTEGER NOT NULL,
	"id_disciplina"	INTEGER,
	FOREIGN KEY("id_professor") REFERENCES "professor"("id_professor") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("id_disciplina") REFERENCES "disciplina"("id_disciplina") ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY("id_turma" AUTOINCREMENT)
);
INSERT INTO "professor" VALUES (1,'Ana Silva','senha1','ana.silva@exemplo.com');
INSERT INTO "professor" VALUES (2,'João Souza','senha2','joao.souza@exemplo.com');
INSERT INTO "professor" VALUES (3,'Maria Santos','senha3','maria.santos@exemplo.com');
INSERT INTO "professor" VALUES (4,'Pedro Almeida','senha4','pedro.almeida@exemplo.com');
INSERT INTO "professor" VALUES (5,'Julia Oliveira','senha5','julia.oliveira@exemplo.com');
INSERT INTO "disciplina" VALUES (1,'matemática');
INSERT INTO "aluno" VALUES (1,'Carolos Santos',6,1);
INSERT INTO "aluno" VALUES (2,'Julia Oliveira',6,1);
INSERT INTO "aluno" VALUES (3,'Pedro Almeida',6,1);
INSERT INTO "aluno" VALUES (4,'Ana Silva',6,1);
INSERT INTO "aluno" VALUES (5,'João Souza',6,1);
INSERT INTO "aluno" VALUES (6,'Maria Santos',7,2);
INSERT INTO "aluno" VALUES (7,'Fernando Oliveira',7,2);
INSERT INTO "aluno" VALUES (8,'Mariana Almeida',7,2);
INSERT INTO "aluno" VALUES (9,'Luis Souza',7,2);
INSERT INTO "aluno" VALUES (10,'Sara Silva',7,2);
INSERT INTO "aluno_turma" VALUES (1,1);
INSERT INTO "aluno_turma" VALUES (2,1);
INSERT INTO "aluno_turma" VALUES (3,1);
INSERT INTO "aluno_turma" VALUES (4,1);
INSERT INTO "aluno_turma" VALUES (5,1);
INSERT INTO "aluno_turma" VALUES (6,2);
INSERT INTO "aluno_turma" VALUES (7,2);
INSERT INTO "aluno_turma" VALUES (8,2);
INSERT INTO "aluno_turma" VALUES (9,2);
INSERT INTO "aluno_turma" VALUES (10,2);
INSERT INTO "turma" VALUES (1,'6A',6,1,1);
INSERT INTO "turma" VALUES (2,'7b',7,2,1);
INSERT INTO "turma" VALUES (3,'9a',9,1,1);
INSERT INTO "turma" VALUES (4,'7b',7,1,1);
INSERT INTO "turma" VALUES (5,'8b',8,1,1);
INSERT INTO "turma" VALUES (6,'8c',8,1,1);
INSERT INTO "turma" VALUES (7,'8c',8,1,1);
INSERT INTO "turma" VALUES (8,'8d',8,2,1);
INSERT INTO "turma" VALUES (9,'8d',8,2,1);
INSERT INTO "turma" VALUES (10,'9e',9,2,1);
INSERT INTO "turma" VALUES (11,'9c',9,2,1);
COMMIT;
