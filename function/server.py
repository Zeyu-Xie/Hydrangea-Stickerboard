from flask import Flask, request, send_file, render_template
import warnings
from flask_socketio import SocketIO
from flask_cors import CORS
from app.app import stickerboard
import os

warnings.filterwarnings("ignore")

app = Flask(__name__, static_folder="static")
PORT = 15372
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app, origins="*")


@app.route("/stickerboard/api/submitImages")
def submitPhotos():
    stickerboard()
    return {"ok": "1"}

@app.route("/stickerboard/api/downloadImage")
def downloadImage():
    res=send_file("app/output.png")
    res.headers["Content-Disposition"] = "attachment; filename=output.png"
    return res

@app.route("/stickerboard")
def page():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(port=PORT)
