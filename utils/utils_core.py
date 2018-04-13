from time import strftime, gmtime


def get_datetime():
    return strftime("%Y-%m-%d %H:%M:%S", gmtime())
