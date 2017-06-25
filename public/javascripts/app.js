
const API_URL = "/api/v1/chp/"


/**
    * Show a message at the top
     * mssgType is one of {"success", "warning", "info", "danger"}
     */
function message(mssg, mssgType) {
    // Clear alert classes
    ["success", "warning", "info", "danger"].map(function(c) {
        $(".alert").removeClass("alert-" + c);
    });

    // Add new class
    $(".alert").addClass("alert-" + mssgType);
    $(".alert").text(mssg);
    $(".alert").show();

}

/**
    * Build json request data
    */
function buildRequest() {
    // Grab data from textarea
    var ident = $("#ident").val();
    var c = Number($("input[name='rate-c']:checked").val());
    var h = Number($("input[name='rate-h']:checked").val());
    var p = Number($("input[name='rate-p']:checked").val());
    return {'ident': ident, 'c': c, 'h': h, 'p': p};
}


/**
    * On user submit
    */
function onSubmit(evt) {
    var requestObj = JSON.stringify(buildRequest());
    console.log(requestObj);
    
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'type': 'POST',
        'url': API_URL,
        'data': requestObj,
        'dataType': 'json',
        'success': function(returnData) {
            console.log(returnData);
            updateChpsView(returnData);
        },
        'error': function(xhr, status, error) {
            console.log(xhr);
            //message(JSON.parse(xhr.responseText).message, "warning");
            message(xhr.responseText, "error");
        }
    }).done(function() {
        message("request successful", "success");
    }).fail(function() {
        //message("Error - check console", "warning");
    }).complete(function() {
        // maybe update view
    });
}

function refresh() {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'type': 'GET',
        'url': API_URL,
//        'data': requestObj,
        'dataType': 'json',
        'success': function(returnData) {
            console.log(returnData);
            updateChpsView(returnData);
        },
        'error': function(xhr, status, error) {
            console.log(xhr);
            //message(JSON.parse(xhr.responseText).message, "warning");
            message(xhr.responseText, "error");
        }
    }).done(function() {
        //message("request successful", "success");
    }).fail(function() {
        //message("Error - check console", "warning");
    }).complete(function() {
        // maybe update view
    });
}

function updateChpsView(chps) {
    $("#chps-submitted").empty();
    var sumC = 0; sumH = 0; sumP = 0;
    chps.map((chpObj) => {
        var rowVal = "C: " + chpObj.c + " H: " + chpObj.h + " P: " + chpObj.p + " " + chpObj.ident;
        $("#chps-submitted").append("<li class='list-group-item'>" + rowVal +"</li>");
        sumC += Number(chpObj.c);
        sumH += Number(chpObj.h);
        sumP += Number(chpObj.p);
    });
    $("#avg-c").text(parseFloat(sumC / Math.max(chps.length, 1)).toFixed(2));
    $("#avg-h").text(parseFloat(sumH / Math.max(chps.length, 1)).toFixed(2));
    $("#avg-p").text(parseFloat(sumP / Math.max(chps.length, 1)).toFixed(2));
}

/**
 * Register listeners on document ready
 */
$(document).ready(function() {
    $(".alert").hide();

    // Register action for submit button
    $("#submit-button").click(onSubmit);
    refresh();
});
