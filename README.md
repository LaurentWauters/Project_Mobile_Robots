# Remote robot app - Integrated project: Mobile   

##App description  
Through the use of [AngularJS](https://www.codeschool.com/courses/shaping-up-with-angular-js) & [MeteorJS](https://www.meteor.com/tutorials/angular/creating-an-app), a scalable web & platformindependent application is created.
[MongoDB](https://docs.mongodb.com/?_ga=1.96068508.1489278388.1479118631) is used to save "settings";  
* Reconnect on startup w most recent robot?  
* How many in list of recent robots to show? (all are saved tho)

##Specs   
* Keep connection open for 2 hours, reprompt for IP after.  
* Show actions / type of robot bc not every robot can undertake same actions  

##Database  
MongoDB will be used to save all through JSON __IF__ DB is global, online. __ELSE__ Sqlite is used to save local.  
* Save robot + IP when first connected to  
* Save favourites for robots

##Views  

###Header  
Static header showing robot's __icon__, __name__, __IP-address__ && __battery level__.

###Footer  
Static footer with three clickable options;
* __VOLUME:__ Slider-overlay to change global volume.
* __CHANGE ROBOT:__ Overlay with choice between __recent IPs & name__ && __textfield with connect button__ to choose new robot.
* __LOGOUT:__ Overlay with 'Confirm logout?', will redirect to login page.

###Home page  
* __LOGIN:__ Overlay as modal, where user enters IP-address. __NOTE;__ skipped if user still logged in + in period of 2hours.  
	* Textfield  
	* 'Connect' button  

* __ROBOT:__ Shows robot's face as image with 'Click me' note, shows options onclick.__NOTE;__ if type == 'Pepper' this page also shows a 'mock-img' with mood/age/gender PLUS a refresh button to refresh  
	* Actions icon  
	* Say icon  
	* Settings icon  
	* Manual icon  
	
####Actions view  
Shows a __table with all actions__ applicable to that type of robot, a __livefeed__ 'toggle' button and a __back__ button.  
On action select;  
* livefeed shown if selected  
* status saying what the robot is doing  

####Say view  
Shows textarea where text to be said by robot can be entered, a 'speak' button and a __back__ button.  

####Settings view  
Shows preferences to be saved. No save button, click/select is autosaved to DB and a __back__ button.  

####Manual view  
Shows tree view of all actions for all types as treeview; opens currently selected as standard and a __back__ button.  


##Questions still open to interpretation  
* User option in hamburger  
* Arrows (Strong left, left, right, strong right)  
* Can we dynamically 'getType' in the RAL?  
* What settings to save?  
