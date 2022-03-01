import React from "react";
import {connect} from "react-redux";
import ReactSwitch from "react-switch";

const Toggle=(props)=>{

    let checked=props.checked

    function changeChecked(e) {
        props.onChange(!checked)
    }

    return (
        <div>
            {props.isLoggedIn &&
            <div className="py-4" style={{textAlign: "center"}}>
                <span> Online <ReactSwitch checked={checked} onChange={changeChecked} onColor={"#0B5ED7"}/> Offline </span>
            </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return state.loginContext;
}

export default connect(mapStateToProps)(Toggle)
