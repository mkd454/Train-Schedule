$(document).ready(function() {
  // Steps to complete:

  // 3. Create a way to retrieve employees from the employee database.
  // 4. Create a way to calculate the months worked. Using difference between start and current time.
  //    Then use moment.js formatting to set difference in months.
  // 5. Calculate Total billed

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

    // Logs everything to console
    // console.log(newTrain.Train);
    // console.log(newTrain.Destination);
    // console.log(newTrain.FirstTrainTime);
    // console.log(newTrain.Frequency);

    // Empty form text boxes
    $("#NewTrainName").val("");
    $("#NewDestination").val("");
    $("#FirstTrainTime").val("");
    $("#Frequency").val("");
  });

  // 3. Create Firebase event for adding new train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());

    // Store everything into a variable.
    var trainName = snapshot.val().Train;
    var destination = snapshot.val().Destination;
    var trainTime = snapshot.val().FirstTrainTime;
    var frequency = snapshot.val().Frequency;

    // console.log(trainName);
    // console.log(destination);
    // console.log(trainTime);
    // console.log(frequency);

    // Prettify the train start
    var trainStartPretty = moment(trainTime, "HH:mm:ss").format("h:mm A");

    // Minutes away
    var minutesAway = moment(trainTime, "HH:mm:ss").fromNow("mm");
    
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(trainStartPretty),
      $("<td>").text(minutesAway),
    );

    // Append the new row to the table
    $("#train-schedule > tbody").append(newRow);
  
  })

});