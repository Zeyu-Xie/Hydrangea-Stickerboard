import React from "react"
import "./App.css"
import hydrangea from "./hydrangea.png"
import axios from "axios"

class App extends React.Component {

    file = React.createRef()
    imageList = React.createRef()

    constructor(props) {
        super(props)
        this.state = {
            imageList: [],
            num: 0
        }
    }

    componentDidMount() {
        this.submit = this.submit.bind(this)
        this.update = this.update.bind(this)
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

                        <div id="sub-right-content-box" className="input-group m-auto">
                            <input type="file" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username with two button addons" ref={this.file} multiple="multiple" />
                            <button className="btn btn-outline-secondary" type="button" onClick={this.update}>Update</button>
                            <button className="btn btn-outline-secondary" type="button" onClick={this.submit}>Submit</button>
                            <a href="http://127.0.0.1:15372/stickerboard/api/downloadImage" className="btn btn-outline-secondary" type="button">Download</a>
                        </div>
                        <ul id="sortable" ref={this.imageList}>
                            {
                                this.state.imageList && this.state.imageList.map((item, index) => {
                                    return <li className="ui-state-default bg-white border-secondary-subtle d-flex">
                                        <img src={URL.createObjectURL(item.get("file"))} alt={`${index}`} />
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    update = () => {
        const files = this.file.current.files

        const num = files.length
        let formData = new Array(num)

        for (let i = 0; i < num; i++) {
            formData[i] = new FormData()
            let fd = new FormData()
            fd.append("file", files[i])
            fd.append("alt", this.state.num + i)
            formData[i] = fd
        }

        this.setState({
            imageList: [...this.state.imageList, ...formData],
            num: this.state.num+num
        })
    }


    submit = async () => {
        const lis = document.getElementById("sortable").children
        const num = this.state.num
        let src_lis = new Array(num)
        for (let i = 0; i < num; i++) {
            src_lis[i] = lis[i].children[0].getAttribute("alt")
        }

        for (let i = 0; i < num; i++) {
            console.log(this.state.imageList[src_lis[i]])
            await axios.post(`http://127.0.0.1:15372/stickerboard/api/submitImage?index=${i}&type=${this.state.imageList[src_lis[i]].get("file").type.split("/")[1]}`, this.state.imageList[src_lis[i]], {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                console.log(res)
            }).catch(err => {
                console.log("ERROR", err)
            })
        }

        await axios.get("http://127.0.0.1:15372/stickerboard/api/processImages").then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log("ERROR",err)
        })
    }

}

export default App