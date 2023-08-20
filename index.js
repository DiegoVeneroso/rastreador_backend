var gps = require("gps-tracking");
let date_time = new Date();

// get current date
// adjust 0 before single digit date
let date = ("0" + date_time.getDate()).slice(-2);

// get current month
let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

// get current year
let year = date_time.getFullYear();

// get current hours
let hours = date_time.getHours();

// get current minutes
let minutes = date_time.getMinutes();

// get current seconds
let seconds = date_time.getSeconds();

var options = {
    'debug'                 : false, //We don't want to debug info automatically. We are going to log everything manually so you can check what happens everywhere
    'port'                  : 3000,
    'device_adapter'        : "GT06"
}

var server = gps.server(options,function(device,connection){

    device.on("connected",function(data){

        console.log("I'm a new device connected");
        return data;

    });

    device.on("login_request",function(device_id,msg_parts){

        console.log('Hey! I want to start transmiting my position. Please accept me. My name is '+device_id);

        this.login_authorized(true); 

        console.log("Ok, "+device_id+", you're accepted!");

    });
    

    device.on("ping",function(data){
        //this = device
        console.log("I'm here: "+data.latitude+", "+data.longitude+" ("+this.getUID()+")");

        //Look what informations the device sends to you (maybe velocity, gas level, etc)
        console.log('ping');
        console.log(data);
        return data;

    });

   device.on("alarm",function(alarm_code,alarm_data,msg_data){
        console.log("Help! Something happend: "+alarm_code+" ("+alarm_data.msg+")");
    }); 

    //Also, you can listen on the native connection object
    connection.on('data',function(data){
        //echo raw data package
        console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
        console.log(data.toString()); 
    })

})