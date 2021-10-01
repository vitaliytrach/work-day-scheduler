var hour = moment().hour();

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

// Inital method for when page loads
function onLoad() {
    for(var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var val = localStorage.getItem(key);
        putInProperBox(key, val);
    }

    updateBackgroundColors();
    setInterval(checkTime, 1000);
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

function updateBackgroundColors() {
    $.each(allInputBoxEl, function(i, obj) {
        var attr = allInputBoxEl[i].getAttribute("data-time");
        var num = attr.match(/\d/g);
        num = num.join("");

        if(num < 9) {
            num += 12;
        }
        
        if(num < hour) {
            $(obj).css("background-color", "lightgrey");
        } else if(num == hour) {
            $(obj).css("background-color", "red");
        } else {
            $(obj).css("background-color", "green");
        }
    });
}

// Function that runs every second to see if the hour has changed
function checkTime() {
    var currHour = moment().hour();

    if(currHour !== hour) {
        hour = currHour;
        dateEl.text(moment().format("dddd, MMMM  Mo"));
        updateBackgroundColors();
    }
}