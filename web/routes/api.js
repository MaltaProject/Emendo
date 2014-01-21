/*
 * GET Default API page
 */

exports.findErrors = function(req, res){
  
  //API Defaults
  var limit = 1;
  var format = "json";
  var topLeftLat = 80;
  var topLeftLon = 195;
  var bottomRightLat = -50;
  var bottomRightLon = -145;
  
  //Find Bounding Box
  if (req.query.topLeftLat != undefined){
    topLeftLat = req.query.topLeftLat;
  }
  if (req.query.topLeftLon != undefined){
    topLeftLon = req.query.topLeftLon;
  }
  if (req.query.bottomRightLat != undefined){
    bottomRightLat = req.query.bottomRightLat;
  }
  if (req.query.bottomRightLon != undefined){
    bottomRightLon = req.query.bottomRightLon; 
  }
  
  //Number of results to return
  if (req.query.limit < 100){
     limit = req.query.limit;
  }
  
  var pg = require('pg');
  var config = require('../config/config.json');
  var connection = config.connection;

  var client = new pg.Client(connection);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query("SELECT * FROM emendo_errors LIMIT 100", function(err, result) {
      if(err) {
        res.send(500, "Internal Server Error");
        return console.error('error running query', err);
      } else {
        if (format == "json"){
          getJSON(result, res)
        }
      }
      client.end();
    });
  });
}

function getJSON(query, res){
  
  //JSON result
  var result = {};
  
  result.type = "GeometryCollection";
  result.geometries = [];
  
  for (var i = 0; i<query.rows.length; i++){
    var point = {};
    point.type = "Point";
    point.coordinates = [query.rows[i].lon, query.rows[i].lat];
    result.geometries.push(point);
  }
  
  res.json(200, result);
}
