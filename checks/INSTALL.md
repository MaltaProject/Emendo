Unlike the webserver, the backend takes a bit more work to get set up.

Here are preliminary instructions to get osm data into postgres with osmosis.

Prerequisites:
:postgres (9.3.2 at time of writing)
:osmosis
:java7

Instructions:
su (enter root)
su postgres (become postgres user)
initdb -D <folder> (sets up database in custom location)
postgres -D <folder> (opens database)


createdb osm (creates database)
psql -d osm (opens database in interactive console)
select setting from pg_settings where name = 'data_directory'; (shows database location)
\q (quits)
createlang plpgsql osm (Sets procedural language)
createuser keepright (Creates new psql user)

psql -d osm (connect to terminal)
ALTER USER keepright WITH SUPERUSER;
\q
psql -U keepright osm
CREATE EXTENSION hstore;
CREATE EXTENSION postgis;
\q

(browse to osmosis directory /script)
psql -d osm -f pgsimple_schema_0.6.sql

ALTER USER keepright WITH PASSWORD 'keepright';
./osmosis --read-pbf file="/run/media/vala/OpenStreetMap/north-america-latest.osm.pbf" --write-pgsimp user="keepright" database="osm" password="keepright"
