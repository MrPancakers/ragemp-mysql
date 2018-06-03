module.exports =
{
    registerAccount: function(player){
        player.money = 5000;
        player.position = new mp.Vector3(15, 15, 71);   //Use the same values that are default inside your DB
    },
    saveAccount: function(player){
        gm.mysql.handle.query('UPDATE `accounts` SET money = ? WHERE username = ?', [player.money, player.name], function(err, res, row){});
    },
    loadAccount: function(player){
        gm.mysql.handle.query('SELECT * FROM `accounts` WHERE username = ?', [player.name], function(err, res, row){
            if(res.length){
                res.forEach(function(playerData){
                    player.name = playerData.username;
                    player.money = playerData.money;
                    player.position = new mp.Vector3(playerData.posX, playerData.posY, playerData.posZ);
                    player.logged = true;
                    console.log("[DEBUG] Data: " + JSON.stringify(playerData));
                });
            }
        });
        console.log(player.name + " has logged in.")
        player.outputChatBox("Data Loaded.")
    }
}