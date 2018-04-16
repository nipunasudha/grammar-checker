var grammarApp = {
    consts: {
        //A test url to load a message from the backend
        // msgUrl: 'http://localhost:5000/getmsg',
        //A test url to send a message to flask for printing
        // printerUrl: 'http://localhost:5000/printmsg',

        //Actual grammar check url
        checkGrammar: 'http://localhost:5000/checkgrammar'
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
    //OLD demo functions used for flask data send & get
    /*$('#getMsgBtn').click(function () {
          log('getMsgBtn click');
          grammarAppUtils.sendGet({}, grammarApp.consts.msgUrl, updateResults);
      });
      $('#printMsgBtn').click(function () {
          log('printMsgBtn click');
          grammarAppUtils.sendPost({'textToPrint': 'Hello from the web app!'}, grammarApp.consts.printerUrl, updateResults);
      });*/
    $('body').click(function () {
        hidePopup();
    });
    $('#resultsDiv').on('click', '.g-error', function (e) {
        e.stopPropagation();
        showSuggestions(this);
    });
    $('#g-popup').click(function (e) {
        e.stopPropagation();
    });
    $('#correctionsUl').on('click', 'li', function (e) {
        makeCorrection(this);
    });
    $('#btnCheck').click(function () {
        var inputText = $('#textareaInput').val();
        log(inputText);
        grammarAppUtils.sendPost({'textToCheck': inputText}, grammarApp.consts.checkGrammar, renderResult);
    })

};

//===============================================================
function renderResult(data) {
    log("======= Result from flask =======");
    log(data);
    renderText(data['results'])
}
