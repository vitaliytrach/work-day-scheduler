var dateEl = $("#date");
dateEl.text(moment().format("dddd, MMMM  Mo"));

// Adding click events for all lockboxes
$(".lockboxImg").click(handleClick);
var allInputBoxEl = $("input");

onLoad();

function handleClick(e) {
    var timeAtt = e.target.getAttribute("data-time");
    var inputBox = null;

    // Finding the correct input box for the corresponding lockbox
    $.each(allInputBoxEl, function(i, obj) {
        var attr = allInputBoxEl[i].getAttribute("data-time");

        if(timeAtt === attr) {
            inputBox = obj;
            return false;
        }
    });

    // Saving to local storage
    localStorage.setItem(timeAtt, inputBox.value);
}

function checkLocalStorage() {
    var key = "10AM";
    console.log(localStorage.getItem(key));
}

function onLoad() {
    for(var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var val = localStorage.getItem(key);
        putInProperBox(key, val);
    }
}

function putInProperBox(timeAtt, text) {
    $.each(allInputBoxEl, function(i, obj) {
        var attr = allInputBoxEl[i].getAttribute("data-time");

        if(timeAtt === attr) {
            obj.value = text;
            return false;
        }
    });
}