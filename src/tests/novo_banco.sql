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
CREATE TABLE IF NOT EXISTS "turma" (
	"id_turma"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	"serie"	INTEGER NOT NULL,
	"id_professor"	INTEGER NOT NULL,
	PRIMARY KEY("id_turma" AUTOINCREMENT),
	FOREIGN KEY("id_professor") REFERENCES "professor"("id_professor") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "aluno" (
	"id_aluno"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	"serie"	INTEGER NOT NULL,
	"id_turma"	INTEGER NOT NULL,
	"id_professor"	INTEGER NOT NULL,
	PRIMARY KEY("id_aluno" AUTOINCREMENT),
	FOREIGN KEY("id_turma") REFERENCES "turma"("id_turma") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("id_professor") REFERENCES "professor"("id_professor") ON DELETE CASCADE ON UPDATE CASCADE
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
CREATE TABLE IF NOT EXISTS "turma_disciplina" (
	"id_turma"	INTEGER NOT NULL,
	"id_disciplina"	INTEGER NOT NULL,
	FOREIGN KEY("id_turma") REFERENCES "turma"("id_turma") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("id_disciplina") REFERENCES "disciplina"("id_disciplina") ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY("id_turma","id_disciplina")
);
CREATE TABLE IF NOT EXISTS "nota" (
	"id_aluno"	INTEGER NOT NULL,
	"id_avaliacao"	INTEGER NOT NULL,
	"num_bloco"	INTEGER NOT NULL,
	"nota_acertos"	INTEGER NOT NULL,
	"data"	TEXT NOT NULL,
	FOREIGN KEY("num_bloco") REFERENCES "bloco_questao"("num_bloco") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("id_avaliacao") REFERENCES "avaliacao"("id_avaliacao") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("id_aluno") REFERENCES "aluno"("id_aluno") ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY("id_aluno","id_avaliacao","num_bloco","nota_acertos")
);
COMMIT;
