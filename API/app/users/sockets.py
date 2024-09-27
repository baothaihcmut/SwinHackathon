import socketio
from .service import imageProcessService




sio_server = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins=[]
)

sio_app = socketio.ASGIApp(
    socketio_server=sio_server,
    socketio_path='sockets'
)

@sio_server.event
async def connect(sid, environ, auth):
    print(f'{sid}: connected')

@sio_server.event
async def disconnect(sid):
    print(f'{sid}: disconnected')

@sio_server.event
async def sendImage(sid, image):
    print(f"user with id {sid} send image")
    # print(image)
    result = imageProcessService.process(sid,image['data'])
    if result:
        await sio_server.emit('donePredict', {'res': result})
    
