import os

def maigret_pdf(username):
    command = 'maigret ' + username + ' --pdf'
    pipe = os.popen(command)
    print(pipe.read())