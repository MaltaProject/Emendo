/* /checks/missing-tags.js
 * Find all objects that are not tagged
 */ 

module.exports = {
  "run": function(){
    var pg = require('./checks/query.js');
    
    //Find all untagged relations
    pg.query("");
    
  }
}
