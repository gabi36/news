import React from "react";
import {Modal, Button} from "react-bootstrap"
import "../css/My.css"
import img from "../assets/img.png"
import {connect} from "react-redux"
import {performLogin, setShowLogin} from "../redux/action/loginAction";

class LoginModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            email: "",
        }
    }

    changeEmailInput = (e) => {
        this.setState({
            email: e.target.value
        })
    };
    changePasswordInput = (e) => {
        this.setState({
            password: e.target.value
        })
    };

    render() {
        return (
            <Modal show={this.props.showLogin}>
                <Modal.Body className="modalBody">
                    <div>
                        <img src={img} alt="" className="loginIcon py-2"/><br/>
                        <label className="py-2 px-2">E-MAIL</label><input onChange={this.changeEmailInput}/><br/>
                        <label className="py-2 px-2">PASSWORD</label><input type="password"
                                                                            onChange={this.changePasswordInput}/><br/>
                        <Button variant="primary" className="modalButton py-2"
                                onClick={()=>this.props.performLogin(this.state.email, this.state.password)}>Login</Button>
                        <Button variant="primary" className="py-2 mr-auto"
                                onClick={this.props.closeLoginModal}>Exit</Button>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}


const mapStateToProps = (state) => {
    const {isLoggedIn, showLogin, showEditUser} = state.loginContext;
    return {
        isLoggedIn, showLogin, showEditUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        performLogin:(email, password) => {
            dispatch(performLogin(email, password))
        },
        closeLoginModal:()=>{
            dispatch(setShowLogin(false))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)

