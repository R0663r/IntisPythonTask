# IntisPythonTask

Da bi se aplikacija pokrenula neophodno je sledece: 
1) Instalirati PostgreSQL server ukoliko vec ne postoji.
2) Napraviti bazu sa proizvoljnim imenom, a zatim importovati vec postojecu
   Shema-u koristeci public.sql file iz root direktorijuma aplikacije.
3) Unijeti odgovarajuce parametra za komunikaciju sa bazom u fajl
   config.py koji je smjesten u backOffice direktorijumu.
   To su parametri host, eventualno port, naziv baze, user-a i njegovu lozinku.
4) Po zelji moze se promjeniti i port na kojem ce raditi Web server u run.py
   fajlu u root direktorijumu aplikacije.
5) Pokrenuti run.py fajl i potom u browser-u otvoriti link http://localhost:<port>
   Za vrijednost porta treba staviti 5000 ukoliko se ne napravi neka izmjena u
   prethodnom koraku.

Za izradu aplikacije koriscen je Flask framework (Python3.6), za komunikaciju sa PostgreSQL 
bazom je koriscen SQLAlchemy, a sve ostalo je u skladu sa zahtjevima u zadatku.
Na klijentskoj strani je koriscen AngularJS 1.6.6

Baza sadrzi 3 tabele. To su tbl_roles, tbl_users, i tbl_user_details.
Tabele redom sadrze postojece privilegije, osnovne podatke o korisnicima,
te detalje o svakom korisniku. Tabela tbl_users je povezana sa tabelom 
tbl_roles tako sto sadrzi foreign key koji upucuje na id privilegije koji je 
primary kljuc u tabeli tbl_roles. Na isti nacin su povezane i druge dvije 
tabele koje sadrze informacije o korisnicima. Tabela tbl_user_details ima
user_id foreign kljuc koji upucuje na id korisnika u tabeli tbl_users, koji
je ujedno i primary kljuc u tabeli tbl_users.

Funkcionalnosti koje nedostaju su:
1) Verifikacija putem email-a nakon registracije
2) Dekorator koji ce autorizovati pristup REST API-ju na osnovu privilegije
3) Filtriranje kroisnika na prikazu (npr. po privilegiji)
