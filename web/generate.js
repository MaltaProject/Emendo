module.exports = {
  "sidebar": function(){
    var fs = require('fs');

    //Generate jade sidebar from JSON config
    var config = require('./config/errors.json');
    var side = "./views/sidebar.jade";

    fs.writeFileSync(side, "include search\n");
    fs.appendFileSync(side, "#errorContainer\n");
    fs.appendFileSync(side, "  #errorSpacer\n");

    var id = 0;
    for (var i=0; i< config.checks.length; i++){
      if (config.checks[i].enabled == true){
        fs.appendFileSync(side, "    #" + id + ".buttonContainer\n");
        if (config.checks[i].children == true){
          fs.appendFileSync(side, "      #" + id + ".expandButton\n");
        } else {
          fs.appendFileSync(side, "      #" + id + ".infoButton\n");
        }
        
        fs.appendFileSync(side, "      #" + id + ".mainButton\n");
        if (config.checks[i].selected == true){
          fs.appendFileSync(side, "        #" + id + ".selectedButtonImage\n");
        } else {
          fs.appendFileSync(side, "        #" + id + ".buttonImage\n");
        }
        fs.appendFileSync(side, "        #" + id + ".buttonTextContainer\n");
        fs.appendFileSync(side, "          #" + id + ".buttonText\n");
        fs.appendFileSync(side, "            |" + config.checks[i].name + "\n");
        if (config.checks[i].children == true){
          fs.appendFileSync(side, "    #" + id + ".expandSlider\n");
          fs.appendFileSync(side, "      #" + id + ".expandPane\n");
          var sid = 0;
          for (var e=0; e< config.checks[i].subChecks.length; e++){
            fs.appendFileSync(side,"          #" + id + "s" + sid + ".subButtonContainer\n");
            fs.appendFileSync(side,"            #"  + id + "s" + sid + ".infoButton\n");
            fs.appendFileSync(side,"            #" + id + "s" + sid + ".mainButton\n");
            if (config.checks[i].selected == true){
              fs.appendFileSync(side,"              #" + id + "s" + sid + ".buttonImage\n");
            } else {
              fs.appendFileSync(side,"              #" + id + "s" + sid + ".selectedButtonImage\n");              
            }
            fs.appendFileSync(side,"              #" + id + "s" + sid + ".buttonTextContainer\n");
            fs.appendFileSync(side,"                #" + id + "s" + sid + ".buttonText\n");
            fs.appendFileSync(side,"                  |" + config.checks[i].subChecks[e].name + "\n");
            fs.appendFileSync(side,"          #" + id + "s" + sid + ".infoSlider\n");
            fs.appendFileSync(side,"            #" + id + "s" + sid + ".infoText\n");
            fs.appendFileSync(side,"              |" + config.checks[i].subChecks[e].desc + "\n");
            sid++;
          }
        } else {
          fs.appendFileSync(side, "    #" + id + ".infoSlider\n");
          fs.appendFileSync(side, "      #" + id + ".infoText\n");
          fs.appendFileSync(side, "        |" + config.checks[i].desc + "\n");
        }
      }
      id++;
    }
    
  },
  
  "selection": function() {
    var fs = require('fs');

    var config = require('./config/errors.json');
    var select = "./public/javascripts/selection.json";

    for (var i = 0; i < config.checks.length; i++){
      if (config.checks[i].enabled == false){
        delete config.checks[i] 
      } else {
        delete config.checks[i].name;
        delete config.checks[i].desc;
        
        if (config.checks[i].children == true){
          for (var e = 0; e < config.checks[i].subChecks.length; e++){
            if (config.checks[i].subChecks[e].enabled == false){
             delete config.checks[i].subChecks[e];
            } else {
               delete config.checks[i].subChecks[e].name;
               delete config.checks[i].subChecks[e].desc;
               if (config.checks[i].selected == true){
                config.checks[i].subChecks[e].selected = true;  
               } else {
                config.checks[i].subChecks[e].selected = false;                 
               }
            }
          }
        }
      }
    }
    
    fs.writeFileSync(select, JSON.stringify(config));
    
  }
}
