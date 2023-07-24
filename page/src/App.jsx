import React from "react"
import "./App.css"
import hydrangea from "./hydrangea.png"
import axios from "axios"

class App extends React.Component {

    file = React.createRef()

    componentDidMount() {
        this.submit = this.submit.bind(this)
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div id="left-content-box" className="d-flex col-12 col-md-4">
                        <div id="sub-left-content-box" className="d-flex m-auto">
                            <img id="hydrangea" className="col-6 col-md-12 col-lg-10 col-xl-8 col-xxl-7 mx-auto mb-5" src={hydrangea} alt="" />
                            <h3 id="heading" className="text-center col-12 mb-4 mx-auto">Hydrangea Stickerboard</h3>
                            <h5 id="signing" className="col-12 text-center mb-3">By Acan</h5>
                        </div>
                    </div>
                    <div id="right-content-box" className="d-flex col-12 col-md-8">
                        {/* <ul id="sortable">
                            <li className="ui-state-default"><span className="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 1</li>
                            <li className="ui-state-default"><span className="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 2</li>
                            <li className="ui-state-default"><span className="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 3</li>
                            <li className="ui-state-default"><span className="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 4</li>
                            <li className="ui-state-default"><span className="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 5</li>
                            <li className="ui-state-default"><span className="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 6</li>
                            <li className="ui-state-default"><span className="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 7</li>
                        </ul> */}

                        <div id="sub-right-content-box" className="input-group m-auto">
                            <input type="file" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username with two button addons" ref={this.file} multiple="multiple"/>
                            <button className="btn btn-outline-secondary" type="button" onClick={this.submit}>Submit</button>
                            <a href="#" className="btn btn-outline-secondary" type="button">Download</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    submit = () => {
        let files = this.file.current.files
        const num = files.length

        let formData = new Array(num)
        for (let i = 0; i < num; i++) {
            let fd = new FormData()
            fd.append("file", files[i])
            console.log(files[i])
            formData[i] = fd
        }

        for(let i=0;i<num;i++) {
            axios.post("http://127.0.0.1:15372/stickerboard/api/submitImages", formData[i], {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                console.log(res)
            }).catch(err => {
                console.log("ERROR", err)
            })
        }
        
    }
}

export default App