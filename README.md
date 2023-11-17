# StockStop-mobile-app
This is a mobile application called StockStop, with the purpose of allowing users to view detailed information on the companies listed on the NASDAQ-100. Users may track companies of interest using the app's WatchList feature.

### Directories:
This app contains 2 main directories:
1. Client: Contains all code for the client-side.
2. Server: Contains all code for the server-side.

### How to Run:
This project was created using Create React App and Create Expo App. You can use Expo Go for viewing and testing purposes.

#### Client
In the client directory, you will first need to run:

#### `npm install`

This will install the required dependencies for the project (in a folder called `node_modules`). Then, you will need to run:

#### `npm start`

You will be asked where to open the app (iOS, Android, web).

If you have the Expo Go app installed on your mobile device, you may scan the QR code displayed in your console from your mobile device to open the project in Expo Go. 

Alternatively, if you want to view the project on an emulator on your local machine, you will need to have the following installed:
- XCode required to open iOS emulator
- Android Studio required to open Android emulator

To view the app on the web, go to http://localhost:3000 in your browser.
Note: Currently, some app features are not fully functional on the web. Thus, it is recommended you view/test on mobile.

#### Server
The server has been deployed to QUT's virtual machine. Thus, as long as the server is running, users will only need to start the frontend app.
If you need to start the server on your local machine, in the server direcory, you will first need to run:

#### `npm install`

This will install the required dependencies for the project (in a folder called `node_modules`). Then, you will need to run:

#### `npm start`

This will start the server on port 3001.
