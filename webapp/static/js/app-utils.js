var grammarAppUtils = {};

grammarAppUtils.sendGet = function (data, URL, callback) {
    $.ajax({
        type: "GET",
        url: URL,
        data: data,
        crossDomain: true,
        success: function (data) {
            // log(data);
            if (callback && typeof(callback) === "function") {
                callback(data)
            }
        },
        error: function (data) {
            log(data);
            if (callback && typeof(callback) === "function") {
                var errorMsg = {mystatcode: "ERROR", mystat: "Server Unavailable."};
                callback(errorMsg)
            }
        },
        dataType: "json"
    })
};

grammarAppUtils.sendPost = function (data, URL, callback) {

    $.ajax({
        type: "POST",
        url: URL,
        data: data,
        crossDomain: true,
        success: function (data) {
            // log(data);
            if (callback && typeof(callback) === "function") {
                callback(data)
            }

        },
        error: function (data) {
            log(data);
            log({mystatcode: "ERROR", mystat: "Server Unavailable."});
            if (callback && typeof(callback) === "function") {
                var errorMsg = {mystatcode: "ERROR", mystat: "Server Unavailable."};
                callback(errorMsg)
            }
        },
        dataType: "json"
    })
};

function log(obj) {
    console.log(obj);
}