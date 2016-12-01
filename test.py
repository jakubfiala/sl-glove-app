import logging
from socketIO_client import SocketIO, LoggingNamespace
import numpy as np

logging.getLogger('socketIO-client').setLevel(logging.DEBUG)
logging.basicConfig()

with SocketIO('localhost', 3333, LoggingNamespace) as socketIO:
    socketIO.emit('gesture', repr(np.random.uniform((10,10,10))))
    socketIO.wait(seconds=1)