$("#needEmail").hide();
$("#emailExists").hide();
$("#needPassword").hide();
$("#needFirstName").hide();
$("#needLastName").hide();
$("#needZipcode").hide();

var config = {
    apiKey: "AIzaSyDKH_pLUtgyymaT-xwFyZxdeZBxGfJFWrI",
    authDomain: "when-are-you-free.firebaseapp.com",
    databaseURL: "https://when-are-you-free.firebaseio.com",
    projectId: "when-are-you-free",
    storageBucket: "",
    messagingSenderId: "988875414342",
    appId: "1:988875414342:web:a9f646a4384e2be4"
  };

firebase.initializeApp(config);

var database = firebase.database();

// Initial Values
var email = "";
var password = "";
var firstName = "";
var lastName = "";
var interested = "";
var dateDay = "";
var birthday = 0;
var zipcode = 0;
var about = "";

// Capture Button Click

$("#submit").on("click", function (event) {
    event.preventDefault();
    $("#needEmail").hide();
    $("#emailExists").hide();
    $("#needPassword").hide();
    $("#needFirstName").hide();
    $("#needLastName").hide();
    $("#needZipcode").hide();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    email = $("#email-input").val().trim().toLowerCase();
    password = $("#password-input").val().trim();
    firstName = $("#firstname-input").val().trim();
    lastName = $("#lastname-input").val().trim();
    interested = $("#intersested-input").val().trim();
    dateDay = $("#dateDay-input").val().trim();
    birthday = $("#birthday-input").val().trim();
    zipcode = $("#location-input").val().trim();
    about = $("#about-input").val().trim();

    var userExist = false;
    database.ref().orderByChild("email").equalTo(email).once("value", function (snapshot) {
        console.log(snapshot.val());
        var foundUsers = snapshot.val();
        if (foundUsers) {
            userExist = true;
            $("#emailExists").show();
        } 
        if (email == "") {
            $("#needEmail").show();
        }
        if (password == "") {
            $("#needPassword").show();
        }
        if (firstName == "") {
            $("#needFirstName").show();
        } 
        if (lastName == "") {
            $("#needLastName").show();
        }
        if (zipcode == 0 || zipcode.toString().length < 5) {
            $("#needZipcode").show();
        }

        if (!userExist && password && firstName && lastName && zipcode) {
            console.log("LOGIN ashjdgash", userExist);

            // Code for the push
            database.ref().push({
                email,
                password,
                firstName,
                lastName,
                interested,
                dateDay,
                birthday,
                zipcode,
                about



                // Log everything that's coming out of snapshot

                // full list of items to the well
            }, function (errorObject) {
                console.log("Errors handled: " + errorObject.code);
            });
            //after signUp it will take you to user profile page
            window.location = "userprofile.html";
        }
        else {

        }
    });


    // Clear sessionStorage
    sessionStorage.clear();

    // Store all content into sessionStorage
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("firstName", firstName);
    sessionStorage.setItem("birthday", birthday);
    sessionStorage.setItem("zipcode", zipcode);
    sessionStorage.setItem("dateDay", dateDay);
    sessionStorage.setItem("about", about);
    // By default display the content from sessionStorage

});
