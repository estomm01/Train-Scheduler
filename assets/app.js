var config = {

    var config = {
      apiKey: "AIzaSyCM2mkBHKDEYHOfGrhyhNb0MILrjAEtDbA",
      authDomain: "markus-project-dcbb4.firebaseapp.com",
      databaseURL: "https://markus-project-dcbb4.firebaseio.com",
      projectId: "markus-project-dcbb4",
      storageBucket: "markus-project-dcbb4.appspot.com",
      messagingSenderId: "506796572149"
    };

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

var trainName = "";
var destination = "";
var startTime = "";
var frequency = 0;
