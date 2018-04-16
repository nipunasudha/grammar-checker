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

function wrapErrorInSpan(segment) {
    var s = segment;
    // log("<span class='" + s.segmentClass + "' data-corrections='" + JSON.stringify(s.segmentSuggestions).replace(/"/g, '\'') + "'>" + s.segmentContent + "</span>")
    log("<span class='" + s.segmentClass + "'>" + s.segmentContent + "</span>");
    return $("<span class='" + s.segmentClass + "'>" + s.segmentContent + "</span>")
}

function renderText(textList) {
    $.each(textList, function (index, segment) {
        log(segment);
        var segmentType = segment['segmentType'];
        var segmentContent = segment['segmentContent'];
        if (segmentType === 'ok') {
            $('#resultsDiv').append(segmentContent)
        } else {
            var wrapped = wrapErrorInSpan(segment);
            wrapped.data('corrections', JSON.stringify(segment.segmentSuggestions));
            $('#resultsDiv').append(wrapped)
        }
    });

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