var grammarApp = {
    consts: {
        //A test url to load a message from the backend
        msgUrl: 'http://localhost:5000/getmsg',
        //A test url to send a message to flask for printing
        printerUrl: 'http://localhost:5000/printmsg'
    }
};

$(function () {
    grammarApp.init();
    grammarApp.bindUi();
});


grammarApp.init = function () {
    log('grammarApp initialized');
};

grammarApp.bindUi = function () {
    $('#getMsgBtn').click(function () {
        log('getMsgBtn click');
        grammarAppUtils.sendGet({}, grammarApp.consts.msgUrl, updateResults);
    });
    $('#printMsgBtn').click(function () {
        log('printMsgBtn click');
        grammarAppUtils.sendPost({'textToPrint': 'Hello from the web app!'}, grammarApp.consts.printerUrl, updateResults);
    })
};

//--------------- for demo ------------------
function updateResults(data) {
    $('#result').text(JSON.stringify(data))
}