from flask import Flask, request, send_file, render_template
import warnings
from flask_socketio import SocketIO
from flask_cors import CORS
from app.app import stickerboard
import os

script_path = os.path.abspath(__file__)
script_directory = os.path.dirname(script_path)

warnings.filterwarnings("ignore")

app = Flask(__name__, static_folder="static")
PORT = 15372
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app, origins="*", resources="*", methods=["GET", "POST"], allow_headers=[
     "Content-Type", "Accept"], supports_credentials=True)


@app.route("/stickerboard/api/submitImage", methods=["POST"])
def submitImage():
    data = request
    file = data.files.get("file")
    file.save(os.path.join(script_directory, "app", "sources", data.args.get("index")+"."+data.args.get("type")))
    return {"ok": 1}

@app.route("/stickerboard/api/processImages")
def processImages():
    stickerboard()
    cache_directory=os.path.join(script_directory,"app","sources")
    for fileName in os.listdir(cache_directory):
        file_path=os.path.join(cache_directory, fileName)
        os.remove(file_path)
    return {"ok": 1}

@app.route("/stickerboard/api/downloadImage")
def downloadImage():
    res = send_file(os.path.join(script_directory,"app","output.png"))
    res.headers["Content-Disposition"] = "attachment; filename=output.png"
    return res


@app.route("/stickerboard")
def page():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)
