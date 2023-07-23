import React from "react"
import "./App.css"
import hydrangea from "./hydrangea.png"

class App extends React.Component {
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

                    </div>
                </div>
            </div>
        )
    }
}

export default App