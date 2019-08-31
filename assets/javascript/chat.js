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

var myEmail = sessionStorage.getItem("email")
var user2Email = sessionStorage.getItem("matchEmail")

var refPath = "chat-";
if (myEmail < user2Email) {
    refPath += myEmail.replace(/\./g, "_") + "-" + user2Email.replace(/\./g, "_");
}
else {
    refPath += user2Email.replace(/\./g, "_") + "-" + myEmail.replace(/\./g, "_");
}

database.ref(refPath).on("child_added", function (snapshot) {
    console.log(snapshot.val())
    var chat = snapshot.val()
    var chatHTML = $("<div>").text(chat.message).appendTo("#messages")

    if (chat.email == myEmail) {
        chatHTML.addClass("me")
        
    }
    else {
        chatHTML.addClass("notMe")
    }


})

$("#send-message").on("click", function () {

    var message = $("#message").val()
    database.ref(refPath).push({ email: myEmail, message: message })

    $("#message").val("")
})

$.fn.textWidth = function(text, font) {
    
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    
    $.fn.textWidth.fakeEl.text(text || this.val() || this.text() || this.attr('placeholder')).css('font', font || this.css('font'));
    
    return $.fn.textWidth.fakeEl.width();
};

$('.width-dynamic').on('input', function() {
    var inputWidth = $(this).textWidth();
    $(this).css({
        width: inputWidth
    })
}).trigger('input');


function inputWidth(elem, minW, maxW) {
    elem = $(this);
    console.log(elem)
}

var targetElem = $('.width-dynamic');

inputWidth(targetElem);