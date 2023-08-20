var gps = require("gps-tracking");
var moment = require('moment');
// const { Client, Databases, Functions, Account, Users, Storage, InputFile, Query, Permission, Role, ID } = require('node-appwrite');
const sdk = require('node-appwrite')

const client = new sdk.Client();

const databases = new sdk.Databases(client, 'db_na_parada')

client
    .setEndpoint('http://ec2-15-228-235-228.sa-east-1.compute.amazonaws.com/v1')   // Replace with your endpoint
    .setProject('64e216ec75da75d0fe11')  // Replace with your project ID
    .setKey('bd3467bacbd3f7402616c0f3bcd9b85e8bc96fec892c6fcac2b4af7dd033591f0c7f5d48de141ecf222e7b71f49286f5679c95b54d8a6472bf23d6a0b7d775e975e6fdc6bf3d35fdb4c4a9cb6fb3ac762ebcbcb04e42efc40a4bbb156eba3a496f3f0a8fe8168a638ed1f2a445f77965dc614c87d35e375369155ed3b07f2efd');        // Replace with your API Key
   //.setJWT('jwt');       
//    const account = new Account(client);
//    const users = new Users(client);

//    const response =  users.create(
//     ID.unique(),
//     'diegoveneroso.unipampa@gmail.com',
//     null,
//     'Dieg2336',
//     'Diego Veneroso Pereira'
// );

// const promisse = databases.createDocument('cl_localizacao', 'unique()', {'localizacao': 'fadsfsd fs fsd fsd '});



// promisse.then(function(response){
//     console.log(response);
// }, function (error){
//     console.log(error)
// });

// console.log(response);
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
        console.log(moment().format('YYYY-MM-DD:hh:mm:ss'));
        console.log(data.toString()); 
        console.log(data[0].to); 
       

        // databases.createDocument(
        //     'db_na_parada',
        //     'cl_localizacao',
        //     'fdsgdfs',
        //     {'localizacao': 'fadsfsd fs fsd fsd '}
        // )
    })

})