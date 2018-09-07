var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

module.exports =
{
    handle: null,

    connect: function(call){
        this.handle = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'ragemp-mysql'
        });

        this.handle.connect(function (err){
            if(err){
                switch(err.code){
                    case "ECONNREFUSED":
                        console.log("\x1b[93m[MySQL] \x1b[97mError: Check your connection details (packages/mysql/mysql.js) or make sure your MySQL server is running. \x1b[39m");
                        break;
                    case "ER_BAD_DB_ERROR":
                        console.log("\x1b[91m[MySQL] \x1b[97mError: The database name you've entered does not exist. \x1b[39m");
                        break;
                    case "ER_ACCESS_DENIED_ERROR":
                        console.log("\x1b[91m[MySQL] \x1b[97mError: Check your MySQL username and password and make sure they're correct. \x1b[39m");
                        break;
                    case "ENOENT":
                        console.log("\x1b[91m[MySQL] \x1b[97mError: There is no internet connection. Check your connection and try again. \x1b[39m");
                        break;
                    default:
                        console.log("\x1b[91m[MySQL] \x1b[97mError: " + err.code + " \x1b[39m");
                        break;
                }
            } else {
                console.log("\x1b[92m[MySQL] \x1b[97mConnected Successfully \x1b[39m");
            }
        });
    }
};

mp.events.add("sendDataToServer", (player, username, pass, state) => {
    let loggedAccount = mp.players.toArray().find(p => p.loggedInAs == username);
    switch(state){
        case 0: //Login State
        {
            if(loggedAccount){
                console.log("Logged in already.");
                player.call("loginHandler", ["logged"]);
            } else {
                gm.mysql.handle.query('SELECT `password` FROM `accounts` WHERE `username` = ?', [username], function(err, res){
                    if(res.length > 0){
                        let sqlPassword = res[0]["password"];
                        bcrypt.compare(pass, sqlPassword, function(err, res2) {
                            if(res2 === true){  //Password is correct
                                player.name = username;
                                player.call("loginHandler", ["success"]);
                                gm.auth.loadAccount(player);
                            } else {    //Password is incorrect
                                player.call("loginHandler", ["incorrectinfo"]);
                            }
                        });
                    } else {
                        player.call("loginHandler", ["incorrectinfo"]);
                    }
                });
            }
            break;
        }
        case 1: //Register State
        {
            if(username.length >= 3 && pass.length >= 5){
                gm.mysql.handle.query('SELECT * FROM `accounts` WHERE `username` = ?', [username], function(err, res){
                    if(res.length > 0){
                        player.call("loginHandler", ["takeninfo"]);
                    } else {
                        bcrypt.hash(pass, null, null, function(err, hash) {
                            if(!err){
                                gm.mysql.handle.query('INSERT INTO `accounts` SET username = ?, password = ?', [username, hash], function(err, res){
                                    if(!err){
                                        player.name = username;
                                        player.call("loginHandler", ["registered"]);
                                        gm.auth.registerAccount(player);
                                        console.log("\x1b[92m" + username + "\x1b[39m has just registered.");
                                    } else {
                                        console.log("\x1b[31m[ERROR] " + err)
                                    }
                                });
                            } else {
                                console.log("\x1b[31m[BCrypt]: " + err)
                            }
                        });
                    }
                });
            } else {
                player.call("loginHandler", ["tooshort"]);
            }            
            break;
        }
        default:
        {
            player.outputChatBox("An error has occured, please contact your server administrator.")
            console.log("\x1b[31m[ERROR] Login/Register state was one that isn't defined. State: " + state)
            break;
        }
    }
});

mp.events.add("playerQuit", (player) => {
    if(player.loggedInAs != ""){
        gm.auth.saveAccount(player);
    }
});

mp.events.add("playerJoin", (player) => {
    console.log(`${player.name} has joined.`);
    player.loggedInAs = "";
});