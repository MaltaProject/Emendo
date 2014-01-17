/* /checks/fixme.js
 * 
 * Finds key or value tags tha contain fixme
 * highway=road is also considered fixme
 */ 


module.exports = {
  "run": function(){
    var pg = require('./checks/query.js');
    //Return nodes with 'fixme'
    pg.query("SELECT id FROM nodes WHERE id = ANY (SELECT node_id FROM node_tags WHERE k iLIKE '%fixme%' OR v iLIKE '%fixme%' OR (k='name' AND v='tbd') OR (k='ref' AND v='tbd') OR (k='highway' AND v='road'))");
    //Return ways with 'fixme'
    pg.query("SELECT id FROM ways WHERE id = ANY (SELECT way_id FROM way_tags WHERE k iLIKE '%fixme%' OR v iLIKE '%fixme%' OR (k='name' AND v='tbd') OR (k='ref' AND v='tbd') OR (k='highway' AND v='road'))");
    //Return relations with 'fixme'
    pg.query("SELECT id FROM relations WHERE id = ANY (SELECT relation_id FROM relation_tags WHERE k iLIKE '%fixme%' OR v iLIKE '%fixme%' OR (k='name' AND v='tbd') OR (k='ref' AND v='tbd') OR (k='highway' AND v='road'))");
  }
}