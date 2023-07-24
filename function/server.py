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
def submitImages():
    data = request
    print(data.files)
    file = data.files.get("file")
    print(file)
    file.save(os.path.join(script_directory, "app", "sources", file.filename))
    return {"ok": 1}

@app.route("/stickerboard/api/processImages")
def processImages():
    stickerboard()
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
    app.run(port=PORT)
