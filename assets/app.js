
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
// $("#submit").on("click", function() {
//   var traintemp = $("#train-name").val().trim();
//   var citytemp = $("#destination").val().trim();
//   var timetemp = $("#first-train").val().trim();
//   var freqtemp = $("#frequency").val().trim();

//   console.log(traintemp);
//   console.log(citytemp);
//   console.log(timetemp);
//   console.log(freqtemp);
// //github 07 firebase 05 signin sessionstorage class work
//       // Store all content into sessionStorage

//   sessionStorage.setItem("train", traintemp);
//   sessionStorage.setItem("city", citytemp);
//   sessionStorage.setItem("time", timetemp);
//   sessionStorage.setItem("freq", freqtemp);
// });
// By default display the content from sessionStorage
// $("#train-name").val(sessionStorage.getItem("train"));
// $("#destination").val(sessionStorage.getItem("city"));
// $("#first-train").val(sessionStorage.getItem("time"));
// $("#frequency").val(sessionStorage.getItem("freq"));

$("#submit").on("click", function (event) {
  event.preventDefault();

  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var frequency = $("#frequency").val().trim();
  var firstTrain = $("#first-train").val().trim();

  if
    ($("#train-name").val().trim() === "" ||
    $("#destination").val().trim() === "" ||
    $("#first-train").val().trim() === "" ||
    $("#frequency").val().trim() === "") {

    alert("Please fill in all details to add new train");
  }
  else {
    // trainName = $("#train-name").val().trim();


    $(".form-field").val("");
    //pushing everything to the fire database
    console.log(trainName,destination,frequency,firstTrain);
      database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      firstTrain: firstTrain,

    });

    sessionStorage.clear();
    //clers out form
  }

});
//firebase watcher this is the intial loader, class work  19 append child git hub
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val().trainName);
  console.log(childSnapshot.val().destination);


  //   console.log(childSnapshot.val().startTime);

  // First Time (pushed back 1 year to make sure it comes before current time)
  //classwork 07firebase 21 train predictions
  var startTimeConverted = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
  // Difference between the times
  var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
  // Time apart (remainder) between first and next train
  var timeRemain = timeDiff % childSnapshot.val().frequency;
  // Minute Until Train
  var minToArrival = childSnapshot.val().frequency - timeRemain;
  var nextTrain = moment().add(minToArrival, "minutes");

  //dynamically creating a new table row
  var newrow = $("<tr>");
  //taking the childSnapshot and appending it dynamcially
  newrow.append($("<td>" + childSnapshot.val().trainName + "</td>"));
  newrow.append($("<td>" + childSnapshot.val().destination + "</td>"));
  newrow.append($("<td class= 'text-center'>" + childSnapshot.val().frequency + "</td>"));
  newrow.append($("<td class= 'text-center'>" + moment(nextTrain).format("HH:mm") + "</td>"));
  newrow.append($("<td class= 'text-center'>" + minToArrival + "</td>"));
  //newrow.append($("<td class='text-center'><button class='arrival btn btn-danger btn-xs' data-key='" + key + "'>X</button></td>"));
  newrow.append($("<td class= 'text-center'><button class= 'btn btn-danger arrival' data-key='" + childSnapshot.key + "'> Delete </td>"));



  $("#train-table-rows").append(newrow);

});

//need to create some type of attr for the button to remove from the dom
$(document).on("click", ".arrival", function() {
   var tmp = $(this).attr('data-key');
   console.log(tmp);
   database.ref().child(tmp).remove();
  $(this).parent().parent().remove();


});

  currentTime();
