var g_clickedSpan = undefined;

function px(number) {
    return number + "px"
}

function li(text) {
    return "<li data-value='" + text + "'>" + text + "</li>";
}

function positionPopup() {
    clickedSpan = g_clickedSpan;
    var word = $(clickedSpan);
    var popup = $('#g-popup');
    word_position = word.offset();
    popup.css({
        'top': px(word_position.top + 20),
        'left': px(word_position.left)
    })
}

function updateSuggestionsList(list) {
    ul = $('#correctionsUl');
    ul.html("");
    $.each(list, function (index, value) {
        ul.append(li(value));
    });
}


function renderPopup() {
    clickedSpan = g_clickedSpan;
    var correctionListStr = $(clickedSpan).data('corrections').replace(/'/g, '"');
    var correctionList = JSON.parse(correctionListStr);
    log(correctionList);
    updateSuggestionsList(correctionList);
    positionPopup(clickedSpan)
}

function hidePopup() {
    var popup = $('#g-popup');
    popup.hide();
}


function showSuggestions(clickedSpan) {
    g_clickedSpan = clickedSpan;
    renderPopup();
    var popup = $('#g-popup');
    popup.show();
}

function makeCorrection() {

}