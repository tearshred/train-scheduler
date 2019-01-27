// Initialize Firebase
var config = {
    apiKey: "AIzaSyCchmyWILjvT6Eoikm4a3CHmh1ra4uOVpU",
    authDomain: "train-scheduler-daaf2.firebaseapp.com",
    databaseURL: "https://train-scheduler-daaf2.firebaseio.com",
    projectId: "train-scheduler-daaf2",
    storageBucket: "train-scheduler-daaf2.appspot.com",
    messagingSenderId: "950185646551"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("hh:mm a");
    var trainFreq = $("#freq-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDest,
        start: trainStart,
        frequency: trainFreq
    };

    // Uploads train data to the database
    database.ref().push(newTrain);
    // for test only
    console.log(newTrain);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#freq-input").val("");
});

// Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Making sure the first train comes before now
    var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");

    // Calculate the time difference between first train and current time
    var diffTime = moment().diff(moment(firstTrainNew), "minutes");
    var remainder = diffTime % childSnapshot.val().frequency;

    // Calculating how many minutes until next train
    var minutesAway = childSnapshot.val().frequency - remainder;

    // Next train time
    var nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainFreq = childSnapshot.val().frequency;

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(nexTrain),
        $("<td>").text(minutesAway)
    );

    console.log(newRow);
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});