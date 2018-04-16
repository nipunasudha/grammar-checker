from flask import Flask, request, jsonify, render_template, Response, redirect
from flask_cors import CORS
import pprint

import utils
import grammar_engine as gram

app = Flask(__name__)
CORS(app)

dummyData = [
    {
        "segmentType": 'ok',
        "segmentContent": 'This is a sentence section without any errors, but '
    },
    {
        "segmentType": 'error',
        "segmentContent": 'coputar',
        "segmentClass": "g-error g-error-red",
        "segmentSuggestions": [
            'computer',
            'compare',
            'copier'
        ]
    },
    {
        "segmentType": 'ok',
        "segmentContent": ' is an incorrect word. But also '
    },
    {
        "segmentType": 'error',
        "segmentContent": 'nipuna',
        "segmentClass": "g-error g-error-blue",
        "segmentSuggestions": [
            'Nipuna',
            'nipper',
            'nipo'
        ]
    },
    {
        "segmentType": 'ok',
        "segmentContent": ' is not capitalized correctly!'
    }
]


@app.route('/getmsg', methods=['GET'])
def get_msg():
    msg_response = {
        'message': 'Hello from flask! ;)',
        'datetime': utils.get_datetime()
    }
    return jsonify(msg_response)


@app.route('/printmsg', methods=['POST'])
def print_msg():
    msgFromWebApp = request.form['textToPrint']
    print(msgFromWebApp)
    msg_response = {
        'message': 'Message printed on flask console!',
        'datetime': utils.get_datetime()
    }
    return jsonify(msg_response)


@app.route('/checkgrammar', methods=['POST'])
def check_grammar():
    textToCheck = request.form['textToCheck']
    grammarCheckResult = gram.capitalize(textToCheck)
    checkgrammar_response = {
        'message': 'Message printed on flask console!',
        # 'results': grammarCheckResult,
        # injecting dummy data
        'results': dummyData,
        'datetime': utils.get_datetime()
    }
    return jsonify(checkgrammar_response)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True, threaded=True)
