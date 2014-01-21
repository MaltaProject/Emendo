console.log('Running Database Checks')
console.log('Creating emendo_errors table')
var pg = require('./checks/query.js');
pg.query("CREATE TABLE IF NOT EXISTS emendo_errors ("
        + "error_id integer NOT NULL,"
        + "object_type varchar (8) NOT NULL,"
        + "object_id bigint NOT NULL,"
        + "state smallint NOT NULL,"
        + "first_occur timestamptz,"
        + "last_occur timestamptz,"
        + "comment varchar (500),"
        + "lat double precision NOT NULL,"
        + "lon double precision NOT NULL)");
        
pg.query("CREATE TABLE IF NOT EXISTS tmp_errors ("
        + "error_id integer NOT NULL,"
        + "object_type varchar (8) NOT NULL,"
        + "object_id bigint NOT NULL,"
        + "lat double precision NOT NULL,"
        + "lon double precision NOT NULL)");

//Begin Runing Through Error Routines
var config = require('./checks/config.json');

var check = require('./checks/' + config.checks[0].loc);
console.log('Running: ' + config.checks[0].name + ' @' + config.checks[0].loc);
check.run();
