import React from "react"
import axios from "axios"
import hydrangea from "./hydrangea.png"
import "./App.css"
import config from "./config.json"
import { formDataToBlob, base64ToBlob, urlToBlob, blobToBase64, blobToFormData, blobToUrl } from "lavender-imageconverter"

class App extends React.Component {

    file = React.createRef()
    imageList = React.createRef()
    realDownload=React.createRef()

    constructor(props) {
        super(props)
        this.state = {
            imageList: [],
            num: 0
        }
    }

    componentDidMount() {
        this.update = this.update.bind(this)
        this.download=this.download.bind(this)
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div id="left-content-box" className="d-flex col-12 col-md-4">
                        <div id="sub-left-content-box" className="d-flex m-auto">
                            <img id="hydrangea" className="col-6 col-md-12 col-lg-10 col-xl-8 col-xxl-7 mx-auto mb-5 border-secondary-subtle" src={hydrangea} alt="" />
                            <h3 id="heading" className="text-center col-12 mb-4 mx-auto">Hydrangea Stickerboard</h3>
                            <h5 id="signing" className="col-12 text-center mb-3">By Acan</h5>
                        </div>
                    </div>
                    <div id="right-content-box" className="d-flex col-12 col-md-8">

                        <div className="m-auto col-12">
                            <div id="sub-right-content-box" className="input-group m-auto pb-4">
                                <input type="file" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username with two button addons" ref={this.file} multiple="multiple" />
                            </div>
                            <div id="sub-right-content-box" className="input-group m-auto pb-4">
                                <button className="btn btn-outline-secondary" type="button" onClick={this.update}>Update</button>
                                <button className="btn btn-outline-secondary" type="button" onClick={this.download}>Download</button>
                            </div>
                            <a id="real-download" href="#" download="output.png" ref={this.realDownload}>Real Download</a>
                            <ul id="sortable" ref={this.imageList}>
                                {
                                    this.state.imageList && this.state.imageList.map((item, index) => {
                                        return <li className="ui-state-default bg-white border-secondary-subtle d-flex">
                                            <img src={item.src} alt={`${index}`} />
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
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
                    let l = this.state.imageList.slice(); // 创建一个副本以避免直接修改原数组
                    l.push(image)
                    this.setState({
                        imageList: l,
                        num: this.state.num + 1
                    }, () => {
                        console.log(this.state);
                    });
                };
            })(i, image);
        }
    }

    download=()=>{
        const canvas=document.createElement("canvas")
        const ctx=canvas.getContext("2d")
        let h=0
        const num=this.state.num
        let height=0
        let width=0
        for(let i=0;i<num;i++) {
            height+=this.state.imageList[i].height
            width=Math.max(width, this.state.imageList[i].width)
        }
        canvas.setAttribute("width", width)
        canvas.setAttribute("height", height)
        for(let i=0;i<num;i++) {
            ctx.drawImage(this.state.imageList[i],0,h)
            h+=this.state.imageList[i].height
        }
        const url=canvas.toDataURL("image/png")
        const realDownload=document.getElementById("real-download")
        realDownload.setAttribute("href", url)
        realDownload.click()
        // const image=document.createElement("img")
        // image.setAttribute("src", url)
        // document.body.appendChild(image)
    }
    

}

export default App