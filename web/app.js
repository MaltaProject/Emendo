/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');

//Generate jade sidebar from JSON config
console.log('Generating Sidebar from config/errors.json')
var config = require('./config/errors.json');
var side = "./views/sidebar.jade";

fs.writeFileSync(side, "include search\n");
fs.appendFileSync(side, "#errorContainer\n");
fs.appendFileSync(side, "  #errorSpacer\n");

var id = 1
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
      for (var e=0; e< config.checks[i].subChecks.length; e++){
        id++;
        fs.appendFileSync(side,"          #" + id + ".subButtonContainer\n");
        fs.appendFileSync(side,"            #" + id + ".infoButton\n");
        fs.appendFileSync(side,"            #" + id + ".mainButton\n");
        fs.appendFileSync(side,"              #" + id + ".buttonImage\n");
        fs.appendFileSync(side,"              #" + id + ".buttonTextContainer\n");
        fs.appendFileSync(side,"                #" + id + ".buttonText\n");
        fs.appendFileSync(side,"                  |" + config.checks[i].subChecks.name + "\n");
        fs.appendFileSync(side,"          #" + id + ".infoSlider\n");
        fs.appendFileSync(side,"            #" + id + ".infoText\n");
        fs.appendFileSync(side,"              |" + config.checks[i].subChecks.desc + "\n");
      }
      
    } else {
      fs.appendFileSync(side, "    #" + id + ".infoSlider\n");
      fs.appendFileSync(side, "      #" + id + ".infoText\n");
      fs.appendFileSync(side, "        |" + config.checks[i].desc + "\n");
    }
    id++;
  }
}


//Load Webserver
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
