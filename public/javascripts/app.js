
const API_URL = "http://localhost:9000/api/v1/chp/"


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

}

/**
    * Build json request data
    */
function buildRequest() {
    // Grab data from textarea
    var c = Number($("input[name='rate-c']:checked").val());
    var h = Number($("input[name='rate-h']:checked").val());
    var p = Number($("input[name='rate-p']:checked").val());
    return {'c': c, 'h': h, 'p': p};
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
            try {
                console.log(returnData)
            } catch (e) {
                console.log(e);
                console.log(returnData);
            }
        },
        'error': function(xhr, status, error) {
            console.log(xhr);
            //message(JSON.parse(xhr.responseText).message, "warning");
            message(xhr.responseText, "success");
        }
    }).done(function() {
        message("request successful", "success");
    }).fail(function() {
        //message("Error - check console", "warning");
    }).complete(function() {
        // maybe update view
    });
}


/**
    * Register listeners on document ready
    */
$(document).ready(function() {
    // Register action for submit button
    $("#submit-button").click(onSubmit);
});
