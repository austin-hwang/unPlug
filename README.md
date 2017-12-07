# unPlug

unPlug is an alarm clock app that sends money to a user-specified charity whenever the user presses "Snooze" to incentivize them to wake up in the morning. In order to ensure that the user has actually woken up, we require them to upload an image of an object far away from their bed when they first set any alarms, and they can disable the alarm only if they take an image of that same object when trying to turn it off.

### Using unPlug
In order to use unPlug, one has two options. They can access the app as it is meant to be used on an iPhone using Xcode, or access the web-app through the website hosted on Heroku at https://cs50unplug.herokuapp.com/. Using the project is fairly straightforward and requires the following steps:
1. Open the project, using either Xcode or the website.
    * Xcode (on Mac): 
        * If you have not yet, follow instructions at https://developer.apple.com/xcode/ to download Xcode. 
        * Open the unplug.xcodeproj file using Xcode.
        * Using the Build button in the top-left corner or Cmd-Shift-R shortcut, build the project, which will launch it in an iPhone simulator.
    * Webpage: 
        * Go to the website hosted at https://cs50unplug.herokuapp.com/.
2. Create your first alarm! To do so, you must set the following:
    * a *time* (HH:MM),
    * a *time period* (AM or PM), 
    * a *charity* to donate to when snooze is pressed (from the dropdown menu of 4 choices), 
    * an *amount to donate* each time you press snooze (in USD), and 
    * *upload an image* of an object far away from your bed that will be compared to when turning off the alarm.
3. Wait for the alarm to ring … Maybe take a nap during this time.
4. When the alarm rings, choose to either turn it off by *taking a photo* of the object you initially uploaded (far away from your bed, requiring you to get up) OR *snoozing*. *Beware: Snoozing sends money to the charity you chose!* 

Currently, there is a test credit card token in place in order to make demo-ing the app easier, but in theory, a user could input their credit card information in order to make payments to the charity.
(Our trial API Key for Microsoft Azure expires 01/05/2018)
