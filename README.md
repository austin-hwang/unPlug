# unPlug
![alt text](https://i.imgur.com/mAQuqQ6.png)

unPlug is an alarm clock app that sends money to a user-specified charity whenever the user presses "Snooze" to incentivize them to wake up in the morning. In order to ensure that the user has actually woken up, we require them to upload an image of an object far away from their bed when they first set any alarms, and they can disable the alarm only if they take an image of that same object when trying to turn it off. Thus, you can wake up faster or sleep knowing you contributed to a humanitarian cause!

## Using unPlug
In order to use unPlug, one has two options. They can access the app as it is meant to be used on an iPhone using Xcode, or access the web-app through the website hosted on Heroku at https://cs50unplug.herokuapp.com/. Using the project is fairly straightforward and requires the following steps:
1. Open the project, using either Xcode or the website.
    * Xcode (on Mac): 
        * If you have not yet, follow instructions at https://developer.apple.com/xcode/ to download Xcode. 
        * Go to https://gonative.io/manage/bqaecn25tvwmnrdc57mkwkdbdc and download the iOS Source Code.
        * Open the GoNativeIOS.xcodeproj file using Xcode.
        * Using the Build button in the top-left corner or Cmd-Shift-R shortcut, build the project, which will launch it in an iPhone simulator.
    * Online iPhone / Android Simulators:
        * Visit https://gonative.io/share/rzorkj and hit “Tap to Play” on the iPhone / Android simulators as you wish. You can explore the app through there!
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
## Limitations
Currently, there is a test credit card token in place in order to make demo-ing the app easier, but in theory, a user could input their credit card information in order to make payments to the charity.
(Our trial API Key for Microsoft Azure expires 01/05/2018)

## Technologies
<p> <b>Microsoft Azure</b> - Computer Vision API and Face API</p> 

![alt text](https://www.westconcomstor.com/content/dam/wcgcom/Global/Cloud/Vendors/Microsoft/Azure/Azure%20cloud.png)

<p> <b>Stripe</b> - Payments API</p>

![alt text](https://cdn.slidesharecdn.com/ss_thumbnails/stripe-170224113653-thumbnail-4.jpg?cb=1487936764)

<p> <b>Imgur</b> - Photo API</p>

![alt text](https://i.imgur.com/gZ0IUVh.png)

<p> <b>XCode</b> - iOS Development</p>

![alt text](https://cdn.macrumors.com/article-new/2015/09/xcode-6-250x250.png)

<p> <b>Dropone.js</b> - Photo Upload API</p>

![alt text](https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/08/1470508920Screenshot-2016-08-06-14.36.57.png)

<p> <b>SweetAlert2</b> - Stylish Alerts & Modals</p>

![alt text](https://limonte.github.io/sweetalert2/assets/swal2-logo.png)

<p> <b>Heroku</b> - Cloud Application Platform</p>

![alt text](https://softwareengineeringdaily.com/wp-content/uploads/2016/10/herokukafka.png)


## Contributors and Maintainers
Below are the team members who worked on the project. If you would like to contribute, create a pull request and we'll go from there.
- [Austin Hwang](https://github.com/austin-hwang)
- [Manasi Maheshwari](https://github.com/manasi-m)