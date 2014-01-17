module.exports = {
   "query": function(queryString){
    var pg = require('pg');
    var config = require('./config.json');
    var connection = config.connection;

    var client = new pg.Client(connection);
    client.connect(function(err) {
      if(err) {
        return console.error('could not connect to postgres', err);
      }
      
      //
      
      client.query(queryString, function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
        console.log(result.rows);
        client.end();
      });
    });
  }
}


