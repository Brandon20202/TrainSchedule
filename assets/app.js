var counter =0;

var config = {
    apiKey: "AIzaSyDWlFxDEJNyiPbZk43lJNUTspUj4jKa9ds",
    authDomain: "trainschedule-9cf77.firebaseapp.com",
    databaseURL: "https://trainschedule-9cf77.firebaseio.com/",
    projectId: "trainschedule-9cf77",
    storageBucket: "trainschedule-9cf77.appspot.com",
   
};
  // Initialize Firebase
  firebase.initializeApp(config);
  var data = firebase.database();
 

  

  $("#submit-button").on("click", function(){
      event.preventDefault();

       var trainName=$("#name-input").val().trim();
      $("#name-input").val("");
      
      var trainDestination=$("#Destination-input").val().trim();
      $("#Destination-input").val("");
      
      var trainTime=$("#First-Train-Time-input").val().trim();
      $("#First-Train-Time-input").val("");
      
      var trainFrequency=$("#Frequency-input").val().trim();
      $("#Frequency-input").val("");
      
      data.ref().push({
          tName: trainName,
          destination: trainDestination,
          time: trainTime,
          frequency: trainFrequency

        });
    


  });


data.ref().on('child_added', function(childSnapshot) {
    console.log(childSnapshot.val().tName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().time);
    console.log(childSnapshot.val().frequency);

    var newRow = $("<tr>");
	newRow.attr("id", "train-row-" + counter);
	$("#train-table").append(newRow);

	var trainNameTd = $("<td>", {id: "train-name-td"});
	trainNameTd.html(childSnapshot.val().tName);
	$("#train-row-" + counter).append(trainNameTd);

	
	var trainDestinationTd = $("<td>", {id: "train-destination-td"});
	trainDestinationTd.html(childSnapshot.val().destination);
    $("#train-row-" + counter).append(trainDestinationTd);
    


    
    var firstTimeConverted = moment(childSnapshot.val().time, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % childSnapshot.val().frequency;
    var tMinutesTillTrain = childSnapshot.val().frequency - tRemainder; 
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainFormat = moment(nextTrain).format("hh:mm");


    
	var trainFrequencyTd = $("<td>", {id: "train-frequency-td"});
	trainFrequencyTd.html(childSnapshot.val().frequency);
	$("#train-row-" + counter).append(trainFrequencyTd);

	
	var nextTrainTd = $("<td>", {id: "next-train-td"});
	nextTrainTd.text(nextTrainFormat);
	$("#train-row-" + counter).append(nextTrainTd);

	var minutesAwayTd = $("<td>", {id: "minutes-away-td"});
	minutesAwayTd.text(tMinutesTillTrain);
	$("#train-row-" + counter).append(minutesAwayTd);

	counter++;


 

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);

});