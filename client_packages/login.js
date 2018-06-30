var browser1 = mp.browsers.new("package://login/index.html");
mp.gui.cursor.show(true, true);

mp.events.add("loginDataToServer", (user, pass, state) => {
    mp.events.callRemote("sendDataToServer", user, pass, state);
});

mp.events.add("loginHandler", (handle) => {
    switch(handle){
        case "success":
        {
            browser1.destroy();
            mp.gui.chat.push("Login successful");
            mp.gui.chat.activate(true);
            mp.gui.cursor.show(false, false);
            break;
        }
        case "registered":
        {
            browser1.destroy();
            mp.gui.chat.push("Registration successful");
            mp.gui.chat.activate(true);
            mp.gui.cursor.show(false, false);
            break;
        }
        case "incorrectinfo":
        {
            browser1.execute(`$(".incorrect-info").show(); $("#loginBtn").show();`);
            break;
        }
        case "takeninfo":
        {
            browser1.execute(`$(".taken-info").show(); $("#registerBtn").show();`);
            break;
        }
        case "tooshort":
        {
            browser1.execute(`$(".short-info").show(); $("#registerBtn").show();`);
            break;
        }
        case "logged":
        {
            browser1.execute(`$(".logged").show(); $("#loginBtn").show();`);
            break;
        }
        default:
        {
            break;
        }
    }
});