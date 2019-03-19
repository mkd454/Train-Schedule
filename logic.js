$(document).ready(function() {
  // Steps to complete:

  // 1. Initialize Firebase
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCXvZDSBmEiMAh77xyxbZlp0DR9TQ6cDjQ",
      authDomain: "train-schedule-849d9.firebaseapp.com",
      databaseURL: "https://train-schedule-849d9.firebaseio.com",
      projectId: "train-schedule-849d9",
      storageBucket: "",
      messagingSenderId: "616151305338"
    };
    firebase.initializeApp(config);
  
    var database = firebase.database();
  
  // 2. Create button for adding new trains - then update the html + update the database
  $(".btn").on("click", function(event) {
    event.preventDefault();

    //Grabs user input
    var trainName = $("#NewTrainName").val().trim();
    var destination = $("#NewDestination").val().trim();
    var trainTime = $("#FirstTrainTime").val().trim();
    var frequency = $("#Frequency").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
      Train: trainName,
      Destination: destination,
      FirstTrainTime: trainTime,
      Frequency: frequency
    };

    // Upload Train data into database
    database.ref().push(newTrain);

    // Empty form text boxes
    $("#NewTrainName").val("");
    $("#NewDestination").val("");
    $("#FirstTrainTime").val("");
    $("#Frequency").val("");
  });

  // 3. Create Firebase event for adding new train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(snapshot) {
    // console.log(snapshot.val());

    // Store everything into a variable.
    var trainName = snapshot.val().Train;
    var destination = snapshot.val().Destination;
    var trainTime = snapshot.val().FirstTrainTime;
    var frequency = snapshot.val().Frequency;

    // Assumptions
    var tFrequency = frequency;

    // Time is 3:30 AM
    var firstTime = trainTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain),
    );

    // Append the new row to the table
    $("#train-schedule > tbody").append(newRow);
  
  })

});