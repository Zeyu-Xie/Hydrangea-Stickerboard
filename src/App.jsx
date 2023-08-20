import React from "react"
import axios from "axios"
import hydrangea from "./hydrangea.png"
import "./App.css"
import config from "./config.json"
import { formDataToBlob, base64ToBlob, urlToBlob, blobToBase64, blobToFormData, blobToUrl } from "lavender-imageconverter"
import { v4 as uuidv4 } from "uuid"

class App extends React.Component {

    file = React.createRef()
    imageList = React.createRef()

    constructor(props) {
        super(props)
        this.state = {
            imageList: [],
            num: 0,
            spinnerStatus: "hidden"
        }
    }

    componentDidMount() {
        this.update = this.update.bind(this)
        this.download = this.download.bind(this)
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div id="left-content-box" className="d-flex col-12 col-md-4">
                        <div id="sub-left-content-box" className="d-flex m-auto">
                            {/* <img id="hydrangea" className="col-6 col-md-12 col-lg-10 col-xl-8 col-xxl-7 mx-auto mb-5 border-secondary-subtle" src={hydrangea} alt="" /> */}
                            <h3 id="heading" className="text-center col-12 mb-4 mx-auto">Hydrangea Stickerboard</h3>
                            <h5 id="signing" className="col-12 text-center mb-3">By Acan</h5>
                        </div>
                    </div>
                    <div id="right-content-box" className="d-flex col-12 col-md-8">

                        <div id="test" className="m-auto col-12">
                            <div id="sub-right-content-box" className="input-group m-auto pb-4 justify-content-center">
                                <input id="input" type="file" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username with two button addons" ref={this.file} multiple="multiple" />
                                <label id="input-label" className="btn btn-outline-secondary" for="input">Upload</label>
                                <button id="update" className="btn btn-outline-secondary" type="button" onClick={this.update}>Update</button>
                                <button id="download" className="btn btn-outline-secondary" type="button" onClick={this.download}>Download</button>
                            </div>
                            <a id="real-download" href="#" download="output.png">Real Download</a>
                            <ul id="sortable" ref={this.imageList}>
                                {
                                    this.state.imageList && this.state.imageList.map((item, index) => {
                                        return <li className="ui-state-default bg-none d-flex">
                                            <img className="uploadedPhotos" src={item.src} alt={`${index}`} />
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="spinner" className="spinner-border text-secondary" role="status" style={{ visibility: this.state.spinnerStatus }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    update = async () => {
        const files = this.file.current.files;
        const num = files.length;

        for (let i = 0; i < num; i++) {
            let image = new Image();
            image.src = blobToUrl(files[i]);

            ((index, img) => {
                img.onload = () => {
                    let l = this.state.imageList.slice()
                    l.push(img)
                    this.setState({
                        imageList: l,
                        num: this.state.num + 1
                    })
                }
            })(i, image)
        }
    }

    download = async () => {
        try {
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")
            let h = 0
            const num = this.state.num
            let height = 0
            let width = 0
            for (let i = 0; i < num; i++) {
                height += this.state.imageList[i].height
                width = Math.max(width, this.state.imageList[i].width)
            }
            canvas.setAttribute("width", width)
            canvas.setAttribute("height", height)

            const uploadedPhotos = document.getElementsByClassName("uploadedPhotos")

            for (let i = 0; i < num; i++) {
                const t = uploadedPhotos[i].getAttribute("alt")
                ctx.drawImage(this.state.imageList[t], 0, h)
                h += this.state.imageList[t].height
            }
            const url = canvas.toDataURL("image/png")
            const realDownload = document.getElementById("real-download")
            realDownload.setAttribute("href", url)
            realDownload.setAttribute("download", uuidv4() + ".png")
            realDownload.click()
        } catch (err) {
            console.log("ERROR", err)
        }
    }

}

export default App