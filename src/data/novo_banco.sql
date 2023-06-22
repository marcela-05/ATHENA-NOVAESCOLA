BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "prof_disciplina" (
	"id_professor"	INTEGER NOT NULL,
	"id_disciplina"	INTEGER NOT NULL,
	PRIMARY KEY("id_professor","id_disciplina"),
	FOREIGN KEY("id_professor") REFERENCES "professor"("id_professor") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("id_disciplina") REFERENCES "disciplina"("id_disciplina") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "aluno" (
	"id_aluno"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	"serie"	INTEGER NOT NULL,
	"id_professor"	INTEGER NOT NULL,
	PRIMARY KEY("id_aluno" AUTOINCREMENT),
	FOREIGN KEY("id_professor") REFERENCES "professor"("id_professor") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "aluno_turma" (
	"id_aluno"	INTEGER NOT NULL,
	"id_turma"	INTEGER NOT NULL,
	PRIMARY KEY("id_aluno","id_turma"),
	FOREIGN KEY("id_aluno") REFERENCES "aluno"("id_aluno") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("id_turma") REFERENCES "turma"("id_turma") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "turma" (
	"id_turma"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	"serie"	INTEGER NOT NULL,
	"id_professor"	INTEGER NOT NULL,
	"id_disciplina"	INTEGER,
	PRIMARY KEY("id_turma" AUTOINCREMENT),
	FOREIGN KEY("id_professor") REFERENCES "professor"("id_professor") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("id_disciplina") REFERENCES "disciplina"("id_disciplina") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "area_conhecimento" (
	"id_area"	INTEGER NOT NULL,
	"nome_area"	TEXT NOT NULL,
	"id_disciplina"	INTEGER NOT NULL,
	PRIMARY KEY("id_area" AUTOINCREMENT),
	FOREIGN KEY("id_disciplina") REFERENCES "disciplina"("id_disciplina") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "nota" (
	"id_aluno"	INTEGER NOT NULL,
	"id_avaliacao"	INTEGER NOT NULL,
	"num_bloco"	INTEGER NOT NULL,
	"nota_acertos"	INTEGER NOT NULL,
	"data"	TEXT NOT NULL,
	UNIQUE("id_avaliacao","num_bloco","id_aluno"),
	PRIMARY KEY("id_aluno","id_avaliacao","num_bloco","nota_acertos"),
	FOREIGN KEY("id_aluno") REFERENCES "aluno"("id_aluno") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("id_avaliacao") REFERENCES "avaliacao"("id_avaliacao") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "professor" (
	"id_professor"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	"senha"	TEXT NOT NULL,
	"email"	TEXT NOT NULL,
	UNIQUE("email"),
	UNIQUE("id_professor"),
	PRIMARY KEY("id_professor" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "disciplina" (
	"id_disciplina"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	UNIQUE("nome"),
	PRIMARY KEY("id_disciplina" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "avaliacao" (
	"id_avaliacao"	INTEGER NOT NULL,
	"nome_avaliacao"	TEXT NOT NULL,
	"data"	TEXT NOT NULL,
	"serie"	INTEGER NOT NULL,
	"num_total_questoes"	INTEGER,
	"id_professor"	INTEGER NOT NULL,
	"id_disciplina"	INTEGER,
	PRIMARY KEY("id_avaliacao" AUTOINCREMENT),
	FOREIGN KEY("id_professor") REFERENCES "professor"("id_professor") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("id_disciplina") REFERENCES "disciplina"("id_disciplina") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "bloco_questao" (
	"id_avaliacao"	INTEGER NOT NULL,
	"num_bloco"	INTEGER NOT NULL,
	"quant_questoes"	INTEGER NOT NULL,
	"id_area"	INTEGER NOT NULL,
	PRIMARY KEY("id_avaliacao","num_bloco"),
	FOREIGN KEY("id_area") REFERENCES "area_conhecimento"("id_area") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("id_avaliacao") REFERENCES "avaliacao"("id_avaliacao") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "prof_disciplina" VALUES (39,8);
INSERT INTO "prof_disciplina" VALUES (47,1);
INSERT INTO "prof_disciplina" VALUES (48,1);
INSERT INTO "prof_disciplina" VALUES (48,2);
INSERT INTO "prof_disciplina" VALUES (49,5);
INSERT INTO "prof_disciplina" VALUES (49,1);
INSERT INTO "prof_disciplina" VALUES (49,6);
INSERT INTO "prof_disciplina" VALUES (49,3);
INSERT INTO "prof_disciplina" VALUES (49,4);
INSERT INTO "prof_disciplina" VALUES (49,2);
INSERT INTO "prof_disciplina" VALUES (49,7);
INSERT INTO "prof_disciplina" VALUES (49,8);
INSERT INTO "prof_disciplina" VALUES (50,1);
INSERT INTO "prof_disciplina" VALUES (50,3);
INSERT INTO "prof_disciplina" VALUES (50,8);
INSERT INTO "prof_disciplina" VALUES (38,3);
INSERT INTO "prof_disciplina" VALUES (38,4);
INSERT INTO "prof_disciplina" VALUES (38,5);
INSERT INTO "prof_disciplina" VALUES (38,6);
INSERT INTO "prof_disciplina" VALUES (38,7);
INSERT INTO "prof_disciplina" VALUES (38,8);
INSERT INTO "prof_disciplina" VALUES (51,1);
INSERT INTO "prof_disciplina" VALUES (51,2);
INSERT INTO "prof_disciplina" VALUES (52,2);
INSERT INTO "prof_disciplina" VALUES (52,1);
INSERT INTO "prof_disciplina" VALUES (52,6);
INSERT INTO "prof_disciplina" VALUES (38,1);
INSERT INTO "prof_disciplina" VALUES (53,3);
INSERT INTO "prof_disciplina" VALUES (53,5);
INSERT INTO "prof_disciplina" VALUES (56,1);
INSERT INTO "prof_disciplina" VALUES (57,3);
INSERT INTO "prof_disciplina" VALUES (59,2);
INSERT INTO "prof_disciplina" VALUES (59,5);
INSERT INTO "prof_disciplina" VALUES (58,3);
INSERT INTO "prof_disciplina" VALUES (58,6);
INSERT INTO "prof_disciplina" VALUES (60,6);
INSERT INTO "prof_disciplina" VALUES (61,6);
INSERT INTO "prof_disciplina" VALUES (62,1);
INSERT INTO "prof_disciplina" VALUES (62,2);
INSERT INTO "prof_disciplina" VALUES (64,1);
INSERT INTO "prof_disciplina" VALUES (64,4);
INSERT INTO "prof_disciplina" VALUES (64,3);
INSERT INTO "prof_disciplina" VALUES (64,8);
INSERT INTO "prof_disciplina" VALUES (64,2);
INSERT INTO "prof_disciplina" VALUES (64,5);
INSERT INTO "prof_disciplina" VALUES (64,7);
INSERT INTO "prof_disciplina" VALUES (64,6);
INSERT INTO "prof_disciplina" VALUES (66,2);
INSERT INTO "prof_disciplina" VALUES (67,1);
INSERT INTO "prof_disciplina" VALUES (68,6);
INSERT INTO "prof_disciplina" VALUES (68,5);
INSERT INTO "prof_disciplina" VALUES (69,6);
INSERT INTO "prof_disciplina" VALUES (70,5);
INSERT INTO "prof_disciplina" VALUES (70,6);
INSERT INTO "prof_disciplina" VALUES (71,5);
INSERT INTO "prof_disciplina" VALUES (71,6);
INSERT INTO "prof_disciplina" VALUES (72,5);
INSERT INTO "prof_disciplina" VALUES (72,6);
INSERT INTO "prof_disciplina" VALUES (73,5);
INSERT INTO "prof_disciplina" VALUES (73,6);
INSERT INTO "prof_disciplina" VALUES (74,2);
INSERT INTO "prof_disciplina" VALUES (74,7);
INSERT INTO "prof_disciplina" VALUES (81,2);
INSERT INTO "prof_disciplina" VALUES (81,3);
INSERT INTO "prof_disciplina" VALUES (81,4);
INSERT INTO "prof_disciplina" VALUES (83,1);
INSERT INTO "prof_disciplina" VALUES (83,8);
INSERT INTO "prof_disciplina" VALUES (83,3);
INSERT INTO "prof_disciplina" VALUES (83,4);
INSERT INTO "prof_disciplina" VALUES (83,2);
INSERT INTO "prof_disciplina" VALUES (83,6);
INSERT INTO "prof_disciplina" VALUES (83,7);
INSERT INTO "prof_disciplina" VALUES (83,5);
INSERT INTO "prof_disciplina" VALUES (84,1);
INSERT INTO "prof_disciplina" VALUES (84,2);
INSERT INTO "prof_disciplina" VALUES (84,6);
INSERT INTO "prof_disciplina" VALUES (84,7);
INSERT INTO "prof_disciplina" VALUES (84,8);
INSERT INTO "prof_disciplina" VALUES (84,4);
INSERT INTO "prof_disciplina" VALUES (84,5);
INSERT INTO "prof_disciplina" VALUES (84,3);
INSERT INTO "prof_disciplina" VALUES (86,1);
INSERT INTO "prof_disciplina" VALUES (86,5);
INSERT INTO "prof_disciplina" VALUES (86,7);
INSERT INTO "prof_disciplina" VALUES (86,8);
INSERT INTO "prof_disciplina" VALUES (86,6);
INSERT INTO "prof_disciplina" VALUES (86,3);
INSERT INTO "prof_disciplina" VALUES (86,2);
INSERT INTO "prof_disciplina" VALUES (86,4);
INSERT INTO "prof_disciplina" VALUES (87,1);
INSERT INTO "prof_disciplina" VALUES (87,2);
INSERT INTO "prof_disciplina" VALUES (88,1);
INSERT INTO "prof_disciplina" VALUES (88,5);
INSERT INTO "prof_disciplina" VALUES (88,6);
INSERT INTO "prof_disciplina" VALUES (99,2);
INSERT INTO "prof_disciplina" VALUES (100,8);
INSERT INTO "prof_disciplina" VALUES (101,8);
INSERT INTO "aluno" VALUES (14,'Victor',6,38);
INSERT INTO "aluno" VALUES (15,'Davi',6,38);
INSERT INTO "aluno" VALUES (16,'Marcela',6,38);
INSERT INTO "aluno" VALUES (17,'Raissa',6,38);
INSERT INTO "aluno" VALUES (18,'Marcelo',6,38);
INSERT INTO "aluno" VALUES (19,'Pedro',6,38);
INSERT INTO "aluno" VALUES (20,'Raphaela',6,38);
INSERT INTO "aluno" VALUES (21,'Bruce Wayne',6,38);
INSERT INTO "aluno" VALUES (22,'Barry Allen',6,38);
INSERT INTO "aluno" VALUES (23,'Clark Kent',6,38);
INSERT INTO "aluno" VALUES (24,'Diana Prince',6,38);
INSERT INTO "aluno" VALUES (25,'Oliver Queen',6,38);
INSERT INTO "aluno" VALUES (26,'Teste',6,52);
INSERT INTO "aluno" VALUES (27,'Teste 2',6,52);
INSERT INTO "aluno" VALUES (28,'t',6,52);
INSERT INTO "aluno" VALUES (29,'Rapha',6,38);
INSERT INTO "aluno" VALUES (30,'MARCELÃO CRIA DO GOIAIS',6,38);
INSERT INTO "aluno" VALUES (31,'Funciona ainda?',6,38);
INSERT INTO "aluno" VALUES (32,'Fabrício',6,57);
INSERT INTO "aluno" VALUES (33,'Victor',6,57);
INSERT INTO "aluno" VALUES (34,'Washington',8,59);
INSERT INTO "aluno" VALUES (35,'Ana Banana',9,58);
INSERT INTO "aluno" VALUES (36,'João',9,60);
INSERT INTO "aluno" VALUES (37,'Clark Kent',6,61);
INSERT INTO "aluno" VALUES (38,'Marcela Issa',9,62);
INSERT INTO "aluno" VALUES (39,'Vitor',6,64);
INSERT INTO "aluno" VALUES (40,'Ariovaldo Fernandes',6,67);
INSERT INTO "aluno" VALUES (41,'Aluno 1',7,68);
INSERT INTO "aluno" VALUES (42,'Bruce Wayne',9,69);
INSERT INTO "aluno" VALUES (43,'Dick Grayson',9,69);
INSERT INTO "aluno" VALUES (44,'Damian Wayne',9,69);
INSERT INTO "aluno" VALUES (45,'Jason Todd',9,69);
INSERT INTO "aluno" VALUES (46,'Tim Drake',9,69);
INSERT INTO "aluno" VALUES (47,'Stephanie Brown',9,69);
INSERT INTO "aluno" VALUES (48,'Victor Gabriel',6,70);
INSERT INTO "aluno" VALUES (49,'Bruce Wayne',6,84);
INSERT INTO "aluno_turma" VALUES (18,24);
INSERT INTO "aluno_turma" VALUES (17,24);
INSERT INTO "aluno_turma" VALUES (21,24);
INSERT INTO "aluno_turma" VALUES (23,24);
INSERT INTO "aluno_turma" VALUES (19,24);
INSERT INTO "aluno_turma" VALUES (16,24);
INSERT INTO "aluno_turma" VALUES (15,24);
INSERT INTO "aluno_turma" VALUES (14,25);
INSERT INTO "aluno_turma" VALUES (22,25);
INSERT INTO "aluno_turma" VALUES (23,25);
INSERT INTO "aluno_turma" VALUES (24,25);
INSERT INTO "aluno_turma" VALUES (25,25);
INSERT INTO "aluno_turma" VALUES (16,25);
INSERT INTO "aluno_turma" VALUES (21,25);
INSERT INTO "aluno_turma" VALUES (15,25);
INSERT INTO "aluno_turma" VALUES (14,26);
INSERT INTO "aluno_turma" VALUES (15,26);
INSERT INTO "aluno_turma" VALUES (16,26);
INSERT INTO "aluno_turma" VALUES (17,26);
INSERT INTO "aluno_turma" VALUES (18,27);
INSERT INTO "aluno_turma" VALUES (23,27);
INSERT INTO "aluno_turma" VALUES (24,27);
INSERT INTO "aluno_turma" VALUES (14,27);
INSERT INTO "aluno_turma" VALUES (15,27);
INSERT INTO "aluno_turma" VALUES (16,27);
INSERT INTO "aluno_turma" VALUES (17,27);
INSERT INTO "aluno_turma" VALUES (14,28);
INSERT INTO "aluno_turma" VALUES (15,28);
INSERT INTO "aluno_turma" VALUES (18,28);
INSERT INTO "aluno_turma" VALUES (16,28);
INSERT INTO "aluno_turma" VALUES (20,28);
INSERT INTO "aluno_turma" VALUES (21,28);
INSERT INTO "aluno_turma" VALUES (22,28);
INSERT INTO "aluno_turma" VALUES (19,28);
INSERT INTO "aluno_turma" VALUES (17,28);
INSERT INTO "aluno_turma" VALUES (18,33);
INSERT INTO "aluno_turma" VALUES (14,33);
INSERT INTO "aluno_turma" VALUES (32,34);
INSERT INTO "aluno_turma" VALUES (33,34);
INSERT INTO "aluno_turma" VALUES (32,37);
INSERT INTO "aluno_turma" VALUES (14,38);
INSERT INTO "aluno_turma" VALUES (15,38);
INSERT INTO "aluno_turma" VALUES (16,38);
INSERT INTO "aluno_turma" VALUES (14,40);
INSERT INTO "aluno_turma" VALUES (35,42);
INSERT INTO "aluno_turma" VALUES (34,43);
INSERT INTO "aluno_turma" VALUES (38,52);
INSERT INTO "aluno_turma" VALUES (38,53);
INSERT INTO "aluno_turma" VALUES (39,54);
INSERT INTO "aluno_turma" VALUES (0,55);
INSERT INTO "aluno_turma" VALUES (42,58);
INSERT INTO "aluno_turma" VALUES (43,58);
INSERT INTO "aluno_turma" VALUES (45,59);
INSERT INTO "aluno_turma" VALUES (46,59);
INSERT INTO "aluno_turma" VALUES (44,60);
INSERT INTO "aluno_turma" VALUES (46,60);
INSERT INTO "aluno_turma" VALUES (47,60);
INSERT INTO "aluno_turma" VALUES (42,69);
INSERT INTO "aluno_turma" VALUES (45,69);
INSERT INTO "aluno_turma" VALUES (42,71);
INSERT INTO "aluno_turma" VALUES (43,71);
INSERT INTO "aluno_turma" VALUES (42,0);
INSERT INTO "aluno_turma" VALUES (44,0);
INSERT INTO "aluno_turma" VALUES (43,0);
INSERT INTO "aluno_turma" VALUES (42,93);
INSERT INTO "aluno_turma" VALUES (43,93);
INSERT INTO "aluno_turma" VALUES (44,93);
INSERT INTO "aluno_turma" VALUES (44,71);
INSERT INTO "aluno_turma" VALUES (45,71);
INSERT INTO "aluno_turma" VALUES (46,71);
INSERT INTO "aluno_turma" VALUES (20,24);
INSERT INTO "aluno_turma" VALUES (22,24);
INSERT INTO "aluno_turma" VALUES (24,24);
INSERT INTO "aluno_turma" VALUES (25,24);
INSERT INTO "aluno_turma" VALUES (29,24);
INSERT INTO "aluno_turma" VALUES (30,24);
INSERT INTO "aluno_turma" VALUES (31,24);
INSERT INTO "aluno_turma" VALUES (14,24);
INSERT INTO "aluno_turma" VALUES (30,41);
INSERT INTO "turma" VALUES (24,'Teste Agora Vai',6,38,1);
INSERT INTO "turma" VALUES (25,'6A',6,38,1);
INSERT INTO "turma" VALUES (26,'6C',6,38,6);
INSERT INTO "turma" VALUES (27,'6B',6,38,1);
INSERT INTO "turma" VALUES (28,'6D',6,38,1);
INSERT INTO "turma" VALUES (33,'Teste Agora Vai MARCELÃO',6,38,3);
INSERT INTO "turma" VALUES (34,'Multisérie - 2',6,57,3);
INSERT INTO "turma" VALUES (35,'Teste',6,38,1);
INSERT INTO "turma" VALUES (36,'Teste',6,57,3);
INSERT INTO "turma" VALUES (37,'Teste',6,57,3);
INSERT INTO "turma" VALUES (38,'6A',6,38,5);
INSERT INTO "turma" VALUES (39,'Marcelita',6,38,4);
INSERT INTO "turma" VALUES (40,'Marcelita II',6,38,1);
INSERT INTO "turma" VALUES (41,'Exatas10',9,38,1);
INSERT INTO "turma" VALUES (42,'Turminha 2',9,58,3);
INSERT INTO "turma" VALUES (43,'Frontend',8,59,2);
INSERT INTO "turma" VALUES (44,'Turminha ',9,58,3);
INSERT INTO "turma" VALUES (45,'Frontend',8,59,2);
INSERT INTO "turma" VALUES (46,'Turminha ',9,58,3);
INSERT INTO "turma" VALUES (47,'Turminha ',9,58,3);
INSERT INTO "turma" VALUES (48,'901',9,60,6);
INSERT INTO "turma" VALUES (49,'Teste 2.o',6,61,6);
INSERT INTO "turma" VALUES (50,'Teste Agora Vai',6,60,6);
INSERT INTO "turma" VALUES (51,'6B',6,60,6);
INSERT INTO "turma" VALUES (52,'3ao E',9,62,1);
INSERT INTO "turma" VALUES (53,'3ao E',9,62,1);
INSERT INTO "turma" VALUES (54,'6º ano A',6,64,1);
INSERT INTO "turma" VALUES (55,'Seres celestiais',6,67,1);
INSERT INTO "turma" VALUES (56,'Turma 1',7,68,6);
INSERT INTO "turma" VALUES (57,'Turma 1',7,68,6);
INSERT INTO "turma" VALUES (58,'Turma 1',9,69,6);
INSERT INTO "turma" VALUES (59,'Turma 2',9,69,6);
INSERT INTO "turma" VALUES (60,'Turma 3',9,69,6);
INSERT INTO "turma" VALUES (61,'Turma 6',9,70,5);
INSERT INTO "turma" VALUES (62,'Teste Agora Vai',6,73,5);
INSERT INTO "turma" VALUES (63,'Teste Agora Vai',6,74,7);
INSERT INTO "turma" VALUES (67,'Teste Agora Vai',6,83,1);
INSERT INTO "turma" VALUES (68,'Teste Agora Vai',6,84,3);
INSERT INTO "turma" VALUES (69,'Turma 4',9,69,6);
INSERT INTO "turma" VALUES (70,'Teste Agora Vai',7,86,2);
INSERT INTO "turma" VALUES (71,'Turma 007',9,69,6);
INSERT INTO "area_conhecimento" VALUES (3,'Grécia Antiga',3);
INSERT INTO "area_conhecimento" VALUES (4,'Números',1);
INSERT INTO "area_conhecimento" VALUES (5,'Álgebra',1);
INSERT INTO "area_conhecimento" VALUES (6,'Geometria',1);
INSERT INTO "area_conhecimento" VALUES (7,'Grandezas e Medidas',1);
INSERT INTO "area_conhecimento" VALUES (8,'Probabilidade e Estatística',1);
INSERT INTO "area_conhecimento" VALUES (9,'Jornalístico-midiático',2);
INSERT INTO "area_conhecimento" VALUES (10,'Vida pública',2);
INSERT INTO "area_conhecimento" VALUES (11,'Práticas de estudo e pesquisa',2);
INSERT INTO "area_conhecimento" VALUES (12,'Artístico-literário',2);
INSERT INTO "area_conhecimento" VALUES (13,'Tempo, espaço e formas de registro',3);
INSERT INTO "area_conhecimento" VALUES (14,'A invenção do mundo clássico e o contraponto com outras sociedades',3);
INSERT INTO "area_conhecimento" VALUES (15,'Lógicas de organização política',3);
INSERT INTO "area_conhecimento" VALUES (16,'Natureza, ambientes e qualidade de vida',4);
INSERT INTO "area_conhecimento" VALUES (17,'Mundo do trabalho',4);
INSERT INTO "area_conhecimento" VALUES (18,'Formas de representação e pensamento espacial',4);
INSERT INTO "area_conhecimento" VALUES (19,'O mundo moderno e a conexão entre sociedades africanas, americanas e europeias',3);
INSERT INTO "area_conhecimento" VALUES (20,'Lógicas comerciais e mercantis da modernidade',3);
INSERT INTO "area_conhecimento" VALUES (21,'Conexões e escalas',4);
INSERT INTO "area_conhecimento" VALUES (22,'O mundo contemporâneo: o Antigo Regime em crise',3);
INSERT INTO "area_conhecimento" VALUES (23,'Os processos de independência nas Américas',3);
INSERT INTO "area_conhecimento" VALUES (24,'O Brasil no século XIX',3);
INSERT INTO "area_conhecimento" VALUES (25,'Configurações do mundo no século XIX',3);
INSERT INTO "area_conhecimento" VALUES (26,'Conexões e escalas',4);
INSERT INTO "area_conhecimento" VALUES (27,'O nascimento da República no Brasil e os processos históricos até a metade do século XX',3);
INSERT INTO "area_conhecimento" VALUES (28,'Totalitarismos e conflitos mundiais',3);
INSERT INTO "area_conhecimento" VALUES (30,'Matéria e Energia',6);
INSERT INTO "area_conhecimento" VALUES (31,'Vida e Evolução',6);
INSERT INTO "area_conhecimento" VALUES (32,'Terra e Universo',6);
INSERT INTO "area_conhecimento" VALUES (36,'Medidas de tempo',1);
INSERT INTO "area_conhecimento" VALUES (37,'Teste',3);
INSERT INTO "area_conhecimento" VALUES (38,'Por favor, agora vai',5);
INSERT INTO "area_conhecimento" VALUES (39,'Por favor, agora vai',2);
INSERT INTO "nota" VALUES (15,17,1,5,'06/06/2023');
INSERT INTO "nota" VALUES (15,17,2,5,'06/06/2023');
INSERT INTO "nota" VALUES (15,17,3,5,'06/06/2023');
INSERT INTO "nota" VALUES (14,17,1,5,'06/06/2023');
INSERT INTO "nota" VALUES (14,17,3,4,'06/06/2023');
INSERT INTO "nota" VALUES (14,17,2,4,'06/06/2023');
INSERT INTO "nota" VALUES (32,19,1,8,'06/06/2023');
INSERT INTO "nota" VALUES (35,20,1,5,'06/06/2023');
INSERT INTO "nota" VALUES (35,20,2,9,'06/06/2023');
INSERT INTO "nota" VALUES (36,21,1,3,'06/06/2023');
INSERT INTO "nota" VALUES (36,21,2,4,'06/06/2023');
INSERT INTO "nota" VALUES (40,24,1,2,'06/06/2023');
INSERT INTO "nota" VALUES (40,24,2,3,'06/06/2023');
INSERT INTO "nota" VALUES (40,24,3,1,'06/06/2023');
INSERT INTO "nota" VALUES (40,24,4,1,'06/06/2023');
INSERT INTO "nota" VALUES (41,25,1,10,'07/06/2023');
INSERT INTO "nota" VALUES (41,25,2,10,'07/06/2023');
INSERT INTO "nota" VALUES (42,28,1,10,'11/06/2023');
INSERT INTO "nota" VALUES (16,17,1,1,'14/06/2023');
INSERT INTO "nota" VALUES (16,17,2,1,'14/06/2023');
INSERT INTO "nota" VALUES (16,17,3,1,'14/06/2023');
INSERT INTO "nota" VALUES (17,17,1,2,'14/06/2023');
INSERT INTO "nota" VALUES (17,17,2,2,'14/06/2023');
INSERT INTO "nota" VALUES (17,17,3,2,'14/06/2023');
INSERT INTO "nota" VALUES (18,17,1,2,'14/06/2023');
INSERT INTO "nota" VALUES (18,17,2,2,'14/06/2023');
INSERT INTO "nota" VALUES (18,17,3,1,'14/06/2023');
INSERT INTO "nota" VALUES (21,17,1,0,'14/06/2023');
INSERT INTO "nota" VALUES (21,17,2,0,'14/06/2023');
INSERT INTO "nota" VALUES (21,17,3,0,'14/06/2023');
INSERT INTO "nota" VALUES (14,30,1,10,'14/06/2023');
INSERT INTO "nota" VALUES (14,30,2,10,'14/06/2023');
INSERT INTO "nota" VALUES (15,30,1,5,'14/06/2023');
INSERT INTO "nota" VALUES (15,30,2,5,'14/06/2023');
INSERT INTO "nota" VALUES (24,30,1,0,'14/06/2023');
INSERT INTO "nota" VALUES (24,30,2,0,'14/06/2023');
INSERT INTO "nota" VALUES (23,30,1,0,'14/06/2023');
INSERT INTO "nota" VALUES (23,30,2,0,'14/06/2023');
INSERT INTO "nota" VALUES (22,30,1,10,'14/06/2023');
INSERT INTO "nota" VALUES (22,30,2,10,'14/06/2023');
INSERT INTO "professor" VALUES (38,'Victor','rapha.','victor@gmail.com');
INSERT INTO "professor" VALUES (39,'Ana Banana','banana','ana@gmail.com');
INSERT INTO "professor" VALUES (42,'Professor Integrador','rapha.','victor2@gmail.com');
INSERT INTO "professor" VALUES (43,'Teste','1234se','testesessao@gmail.com');
INSERT INTO "professor" VALUES (45,'Professor ','1234prof','prof@tmail.com');
INSERT INTO "professor" VALUES (46,'Prof','1234','prof@gmail.com');
INSERT INTO "professor" VALUES (47,'Teste1','teste','teste1@gmail.com');
INSERT INTO "professor" VALUES (48,'Teste 2','teste12','teste2o@gmail.com');
INSERT INTO "professor" VALUES (49,'Davi','davizao','davi@gmail.com');
INSERT INTO "professor" VALUES (50,'Raissa','raissa','raissa@gmail.com');
INSERT INTO "professor" VALUES (51,'Leonardo','leo1234','leo@gmail.com');
INSERT INTO "professor" VALUES (52,'Batman','thiago','batman@gmail.com');
INSERT INTO "professor" VALUES (53,'Marcelo Corno','corno','marcelocorno@cornao.com');
INSERT INTO "professor" VALUES (55,'teste','teste','teste@gmail.com');
INSERT INTO "professor" VALUES (56,'1 disci','uma','umadis@gmail.com');
INSERT INTO "professor" VALUES (57,'Maria','1234','maria@gmail.com');
INSERT INTO "professor" VALUES (58,'Raphaela ','12345678','raphaela@teste.com');
INSERT INTO "professor" VALUES (59,'Ana','teste','testeana@gmail.com');
INSERT INTO "professor" VALUES (60,'Paulo','1234','naturo.biocactus@gmail.com');
INSERT INTO "professor" VALUES (61,'Professor Teste Turma','prof','professor@turma.com');
INSERT INTO "professor" VALUES (62,'chaaynha','1234','chaaya@gmail.com');
INSERT INTO "professor" VALUES (63,'Cristiano da Silva Santos ','030851','cristianossantos@prof.educacao.sp.gov.br');
INSERT INTO "professor" VALUES (64,'Ádila Santos','123456','adilajudoca@bol.com.br');
INSERT INTO "professor" VALUES (65,'Cristiano da Silva Santos ','240682','sschristian@hotmail.com');
INSERT INTO "professor" VALUES (66,'Cristiano ','12345','cris@gmail.com');
INSERT INTO "professor" VALUES (67,'Daniela T Oliveira','191432','tarrazo25daniela@gmail.com');
INSERT INTO "professor" VALUES (68,'Daniela','teste','daniela.giugliano@novaescola.org.br');
INSERT INTO "professor" VALUES (69,'Alfred','bruce12','alfred@wayne.com');
INSERT INTO "professor" VALUES (70,'Fabi','fabi','fabi@fabi.fabi');
INSERT INTO "professor" VALUES (71,'Teste 01','fabi','teste01@teste.com');
INSERT INTO "professor" VALUES (72,'Alfred','bruce12','alfred2@wayne.com');
INSERT INTO "professor" VALUES (73,'Professor Integrador','fabi','fabi2@fabi.fabi');
INSERT INTO "professor" VALUES (74,'Victor','rapha.','victor21@gmail.com');
INSERT INTO "professor" VALUES (81,'Alfred','alfred','alfred@alfred.com');
INSERT INTO "professor" VALUES (83,'Dick','dick','dick@wayne.com');
INSERT INTO "professor" VALUES (84,'Damin','dick','damian@wayne.com');
INSERT INTO "professor" VALUES (85,'Ca','1234','ca@ca.co');
INSERT INTO "professor" VALUES (86,'Ana Banana','1234','anabanana21@gmail.com');
INSERT INTO "professor" VALUES (87,'Victor Marques','google','victor.marques@sou.inteli.edu.br');
INSERT INTO "professor" VALUES (88,'Victor Gabriel','google','victormarques8801@gmail.com');
INSERT INTO "professor" VALUES (99,'Foto','ft','foto@foto.com');
INSERT INTO "professor" VALUES (100,'Cris','cris','cris@cr7.com');
INSERT INTO "professor" VALUES (101,'Papai Cris','cris','cris7@cr7.com');
INSERT INTO "disciplina" VALUES (1,'matemática');
INSERT INTO "disciplina" VALUES (2,'português');
INSERT INTO "disciplina" VALUES (3,'história');
INSERT INTO "disciplina" VALUES (4,'geografia');
INSERT INTO "disciplina" VALUES (5,'artes');
INSERT INTO "disciplina" VALUES (6,'ciências');
INSERT INTO "disciplina" VALUES (7,'inglês');
INSERT INTO "disciplina" VALUES (8,'educação física');
INSERT INTO "avaliacao" VALUES (17,'Avaliação do Primeiro Bimestre','06/06/2023',6,15,38,1);
INSERT INTO "avaliacao" VALUES (18,'Avaliação II do Primeiro Bimestre','06/06/2023',6,20,38,1);
INSERT INTO "avaliacao" VALUES (19,'Grécia Antiga','06/06/2023',6,10,57,3);
INSERT INTO "avaliacao" VALUES (20,'Interpretação ','06/06/2023',9,20,58,3);
INSERT INTO "avaliacao" VALUES (21,'Evolução','06/06/2023',9,10,60,6);
INSERT INTO "avaliacao" VALUES (22,'Prova I de matemática','06/06/2023',6,10,64,1);
INSERT INTO "avaliacao" VALUES (23,'Leitura de textos jornalísticos ','06/06/2023',6,5,66,2);
INSERT INTO "avaliacao" VALUES (24,'avaliação mensal do 1°trimestre','06/06/2023',6,10,67,1);
INSERT INTO "avaliacao" VALUES (25,'Avaliação 1','07/06/2023',7,2,68,6);
INSERT INTO "avaliacao" VALUES (26,'Teste B','11/06/2023',6,20,70,5);
INSERT INTO "avaliacao" VALUES (27,'Teste B','11/06/2023',6,10,84,3);
INSERT INTO "avaliacao" VALUES (28,'Como lidar com o coringa','11/06/2023',9,10,69,6);
INSERT INTO "avaliacao" VALUES (29,'Como lidar com o charada','12/06/2023',9,1,69,6);
INSERT INTO "avaliacao" VALUES (30,'Avaliação do Segundo Bimestre','14/06/2023',9,20,38,1);
INSERT INTO "bloco_questao" VALUES (17,1,5,4);
INSERT INTO "bloco_questao" VALUES (17,2,5,5);
INSERT INTO "bloco_questao" VALUES (17,3,5,6);
INSERT INTO "bloco_questao" VALUES (18,1,10,7);
INSERT INTO "bloco_questao" VALUES (18,2,10,5);
INSERT INTO "bloco_questao" VALUES (19,1,10,3);
INSERT INTO "bloco_questao" VALUES (20,1,10,3);
INSERT INTO "bloco_questao" VALUES (20,2,10,24);
INSERT INTO "bloco_questao" VALUES (21,1,5,31);
INSERT INTO "bloco_questao" VALUES (21,2,5,30);
INSERT INTO "bloco_questao" VALUES (22,1,5,7);
INSERT INTO "bloco_questao" VALUES (22,2,5,8);
INSERT INTO "bloco_questao" VALUES (23,1,5,9);
INSERT INTO "bloco_questao" VALUES (24,1,4,4);
INSERT INTO "bloco_questao" VALUES (24,3,2,8);
INSERT INTO "bloco_questao" VALUES (24,4,1,7);
INSERT INTO "bloco_questao" VALUES (24,2,3,5);
INSERT INTO "bloco_questao" VALUES (25,1,1,30);
INSERT INTO "bloco_questao" VALUES (25,2,1,31);
INSERT INTO "bloco_questao" VALUES (26,1,20,32);
INSERT INTO "bloco_questao" VALUES (27,1,10,24);
INSERT INTO "bloco_questao" VALUES (28,1,10,32);
INSERT INTO "bloco_questao" VALUES (29,1,1,31);
INSERT INTO "bloco_questao" VALUES (30,2,10,8);
INSERT INTO "bloco_questao" VALUES (30,1,10,7);
COMMIT;
