# import subprocess
#
#
# output = subprocess.check_output('miagret ' + 'dimakpa' + ' --pdf')
#os.system('miagret ' + 'dimakpa' + ' --pdf')

import os

command = 'maigret dimakpa'# + 'dimakpa' + ' --pdf'
pipe = os.popen(command)

print(pipe.read())

# import subprocess
#
# miagret = subprocess.run(["dimakpa", "--pdf"])