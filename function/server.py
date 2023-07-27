from flask import Flask, request, send_file, render_template
import warnings
from flask_socketio import SocketIO
from flask_cors import CORS
from app.app import stickerboard
import json
import os

script_path = os.path.abspath(__file__)
script_directory = os.path.dirname(script_path)
config_path = os.path.join(script_directory, "config.json")
source_directory = os.path.join(script_directory, "app", "sources")
output_path = os.path.join(script_directory, "app", "output.png")
config = {}
with open(config_path, "r") as config_file:
    config = json.load(config_file)

app = Flask(__name__, static_folder="static")
CORS(app, origins="*", resources="*")
# CORS(app, methods=["GET", "POST"], allow_headers=[
#      "Content-Type", "Accept"], supports_credentials=True)

@app.route("/stickerboard/api/submitImage", methods=["POST"])
def submitImage():
    data = request
    file = data.files.get("file")
    file.save(os.path.join(source_directory, data.args.get(
        "index")+"."+data.args.get("type")))
    return {"ok": 1}


@app.route("/stickerboard/api/processImages")
def processImages():
    stickerboard()
    for fileName in os.listdir(source_directory):
        file_path = os.path.join(source_directory, fileName)
        os.remove(file_path)
    return {"ok": 1}


@app.route("/stickerboard/api/downloadImage")
def downloadImage():
    res = send_file(output_path)
    res.headers["Content-Disposition"] = "attachment; filename=output.png"
    return res


@app.route("/stickerboard")
def page():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host=config["host"], port=config["port"])
