
      var config = {
        apiKey: "AIzaSyDZ0RIh4MbHBzgOLOWi_UN5gg2JKQu1ICw",
        authDomain: "train-scheduler-48e4e.firebaseapp.com",
        databaseURL: "https://train-scheduler-48e4e.firebaseio.com",
        projectId: "train-scheduler-48e4e",
        storageBucket: "train-scheduler-48e4e.appspot.com",
        messagingSenderId: "583925867929"
    };

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

var trainName = "";
var destination = "";
var startTime = "";
var frequency = 0;

function currentTime() {
  var current = moment().format('LT');
  $("#currentTime").html(current);
  setTimeout(currentTime, 1000);
 // console.log(currentTime);
};

$(".form-field").on("keyup", function() {
  var traintemp = $("#train-name").val().trim();
  var citytemp = $("#destination").val().trim();
  var timetemp = $("#first-train").val().trim();
  var freqtemp = $("#frequency").val().trim();

  console.log(traintemp);
  console.log(citytemp);
  console.log(timetemp);
  console.log(freqtemp);

  sessionStorage.setItem("train", traintemp);
  sessionStorage.setItem("city", citytemp);
  sessionStorage.setItem("time", timetemp);
  sessionStorage.setItem("freq", freqtemp);
});

$("#train-name").val(sessionStorage.getItem("train"));
$("#destination").val(sessionStorage.getItem("city"));
$("#first-train").val(sessionStorage.getItem("time"));
$("#frequency").val(sessionStorage.getItem("freq"));

$("#submit").on("click", function(event) {
  event.preventDefault();

  if
  ($("#train-name").val().trim() === "" ||
  $("#destination").val().trim() === "" ||
  $("#first-train").val().trim() === "" ||
  $("#frequency").val().trim() === "") {

  alert("Please fill in all details to add new train");
  }
  else {
    trainname = $("#train-name").val().trim();


    $(".form-firled").val("");

    database.ref().push({
      trainName: trainName,
    });

    sessionStorage.clear();
    //clers out form

  }

});
