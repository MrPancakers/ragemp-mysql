# UPDATE (11/01/2021)
I no longer recommend using this resource and instead recommend using this: https://github.com/RageMpOpenSource/RAGE-Accounts

This gamemode was never a great solution but was intended as a starting point, this does work but if you want to benefit your server you either need to look into improving the gamemode or use the other one I've recommended.

# RageMP MySQL Template
This is a template of a very basic login/registration system you can implement into your gamemode to get started. This template only stores usernames and passwords(encrypted with BCrypt) so anything extra will need to be implemented yourself.

## Installation
Either download the source from [RageMP](https://rage.mp) or by getting it from here. You'll also need to have a MySQL server setup, either using WAMP/XAMPP/or from a server. To keep this short I will not go through setting these up, simply Google 'How to setup WAMP' for example to get it setup.


1. Unzip the source and place it inside of your server files folder.
2. Open your command prompt and change your directory to your server folder. Then do 'npm install' to install the required node_modules.
3. Go to your database, create a new database and call it whatever you want (Inside the script it is called ragemp-mysql). Once created, import the ragemp-mysql.sql into your newly created database.
3. Go to packages/mysql/mysql.js and open it. At the top is the connection info, change this to whatever your IP and MySQL username/password is. If you're hosting this locally and you haven't made/changed the MySQL info, the default should be fine.
4. You're all set to go.
  
## Known Issues
- All current known issues will be placed under the issues tab. If there's an issue and it isn't listed there, please create a new issue or contact me.


## Contribution
I'm more than happy for anyone to contribute and fix up anything, and I'm happy for anyone to create Issues if there's a fault they found/any suggestions to make this better.

## Contact
- Discord: MrPancakers#9283
- RageMP Forums: https://rage.mp/profile/5511-mrpancakers/
