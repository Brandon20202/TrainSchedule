var counter =0;

var Config = {
    apiKey: "AIzaSyDWlFxDEJNyiPbZk43lJNUTspUj4jKa9ds",
    authDomain: "trainschedule-9cf77.firebaseapp.com",
    databaseURL: "https://trainschedule-9cf77.firebaseio.com",
    projectId: "trainschedule-9cf77",
    storageBucket: "trainschedule-9cf77.appspot.com",
    messagingSenderId: "209290900216",
    appId: "1:209290900216:web:92227264757055c32d010d"
};
  // Initialize Firebase
  firebase.initializeApp(Config);

  var database = firebase.databaseURL();

  $("#submit-button").on("click", function(){
      event.preventDefault();

      var trainName=$("#name-input").val().trim();
      $("#name-input").val("");
      
      var trainDestination=$("#Destination-input").val().trim();
      $("#Destination-input").val("");
      
      var trainTime=$("#First-Train-Time-input").val().trim();
      $("#Frist-Train-Time-input").val("");
      
      var trainFrequency=$("#Frequency-input").val().trim();
      $("#Frequency-input").val("");
      
      database.ref().push({
          tName: trainName,
          destination: trainDestination,
          time: trainTime,
          frequency: trainFrequency
        });
  });


database.ref().on('child_added', function(childSnapshot) {
    console.log(childSnapshot.val().tName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().time);
    console.log(childSnapshot.val().frequency);

    var firstTimeConverted = moment(childSnapshot.val().time, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % childSnapshot.val().frequency;
    var tMinutesTillTrain = childSnapshot.val().frequency - tRemainder; 
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainFormat = moment(nextTrain).format("hh:mm");

    counter++;

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);

});