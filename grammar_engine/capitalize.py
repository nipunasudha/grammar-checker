import nltk
from nltk import word_tokenize, pos_tag, ne_chunk
from nltk.chunk import tree2conlltags

WORD_LIST_FILE = "words.txt"

"""This function will capitalize the first letter of the first word in every sentence"""


def sentence_capitalizer(text, data):
    final_Sentences = []
    sentences = nltk.sent_tokenize(text)

    for i in range(0, len(sentences)):
        temp = sentences[i].title()

        final_Sentences.append(noun_capitalizer(temp, data).strip())  # sentences[i] = sentences[i].strip().capitalize()
    return " ".join(final_Sentences)


"""This function will capitalize the proper nouns"""


def noun_capitalizer(sentence, data):
    sentences_new = ''

    ne_tree = ne_chunk(pos_tag(word_tokenize(sentence)))
    tagging = tree2conlltags(ne_tree)
    # print(tagging)
    for i in range(0, len(tagging)):
        if tagging[i][1] == 'NN' or tagging[i][1] == 'NNS' or tagging[i][1] == 'NNP' or tagging[i][1] == 'NNPS':
            s = tagging[i][0]
            if s.lower() in data:
                sentences_new = sentences_new + s[0].lower() + s[1:] + ' '
            else:
                sentences_new = sentences_new + tagging[i][0] + ' '
    else:
        s = tagging[i][0]
        if i == 0 or s == 'I':
            sentences_new = sentences_new + s[0] + s[1:] + ' '
        else:
            sentences_new = sentences_new + s[0].lower() + s[1:] + ' '
    return (sentences_new[:-3] + ".")


"""This function will be the main function of the program"""


def get_word_list():
    fp = open(WORD_LIST_FILE, 'r')
    words = []
    for word in fp:
        words.append(word.strip())
    return words


"""This function will be the main function of the program"""


def capitalize(input_text):
    input_text = input_text.lower()
    return sentence_capitalizer(input_text, get_word_list())
