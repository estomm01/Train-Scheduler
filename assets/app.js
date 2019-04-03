
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
//storing and retrieving the most recent user.
$(".form-field").on("keyup", function() {
  var traintemp = $("#train-name").val().trim();
  var citytemp = $("#destination").val().trim();
  var timetemp = $("#first-train").val().trim();
  var freqtemp = $("#frequency").val().trim();

  console.log(traintemp);
  console.log(citytemp);
  console.log(timetemp);
  console.log(freqtemp);
//github 07 firebase 05 signin sessionstorage class work
      // Store all content into sessionStorage

  sessionStorage.setItem("train", traintemp);
  sessionStorage.setItem("city", citytemp);
  sessionStorage.setItem("time", timetemp);
  sessionStorage.setItem("freq", freqtemp);
});
    // By default display the content from sessionStorage
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


    $(".form-field").val("");

    database.ref().push({
    trainName: trainName,
    });

    sessionStorage.clear();
    //clers out form

  }

});
//firebase watcher this is the intial loader, class work  19 append child git hub
  database.ref().on("child_added", function(childSnapshot) {
//   console.log(childSnapshot.val(.trainName).?);
//   console.log(childSnapshot.val(.destination).?);
//   console.log(childSnapshot.val().startTime);

    // First Time (pushed back 1 year to make sure it comes before current time)
    //classwork 07firebase 21 train predictions
  var startTimeConverted = moment(childSnapshot.val().startTime, "hh:mm").subtract(1, "years");
      // Difference between the times
  var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
      // Time apart (remainder)
  var timeRemain = timeDiff % childSnapshot.val().frequency;
      // Minute Until Train
  var minToArrival = childSnapshot.val().frequency - timeRemain;
  var nextTrain = moment().add(minToArrival, "minutes");

 //dynamically creating a new table row
  var newrow=$("<tr>");
//taking the childSnapshot and appending it dynamcially
  newrow.append($("<td>" + childSnapshot.val().trainName + "</td>"));
  newrow.append($("<td>" + childSnapshot.val().destination + "</td>"));


});
