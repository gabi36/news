import React from "react";
import {Modal, Button} from "react-bootstrap"
import "../css/My.css"
import img from "../assets/img.png"
import {connect} from "react-redux";
import {setShowEditUser, updateUser, updateUserImage} from "../redux/action/loginAction";
import Avatar from "react-avatar-edit";

class ViewUserModal extends React.Component {
    constructor(props) {
        super(props);

        const src = '../assets/da.png'

        this.state = {
            password: "",
            newPassword: "",
            email: "",
            resetPassToggle: false,
            changeAvatar: false,
            preview: img,
            src,
            change: false
        }

        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)

        this.resetPassToggle = this.resetPassToggle.bind(this)
        this.changePicture = this.changePicture.bind(this)
        this.doneChangePicture = this.doneChangePicture.bind(this)
    }

    resetPassToggle() {
        this.setState(prev => ({
            resetPassToggle: !prev.resetPassToggle
        }))
    }

    resetPassword(password, newPassword) {
        if (password === this.props.data.password && newPassword) {
            this.props.resetUserPassword(this.props.data.id, newPassword);
            this.resetPassToggle()
            alert("Password changed!")
        } else
            alert("Incorrect old password or new Password null!")
    }

    changePicture() {
        this.setState({
            changeAvatar: true,
        })
    }

    doneChangePicture() {
        this.setState({
            changeAvatar: false,
        })
        this.props.resetUserImage(this.props.data.id, this.state.preview)
        this.setState({
            change: true
        })
    }

    changeOldPasswordInput = (e) => {
        this.setState({
            password: e.target.value
        })
    };
    changeNewPasswordInput = (e) => {
        this.setState({
            newPassword: e.target.value
        })
    };

    onClose() {
        this.setState({preview: img})
        this.props.onChange(img)
    }

    onCrop(preview) {
        this.setState({preview})
        this.props.onChange(preview)
    }

    showAvatar = () => {
        if (this.props.data) {
            if (this.props.data.image)
                return "data:image/png;base64," + this.props.data.image;
            else
                return img;
        } else
            return img;
    }

    render() {
        return (
            <Modal show={this.props.showEditUser}>
                <Modal.Body className="modalBody">
                    <div>
                        {!this.state.resetPassToggle &&
                        <div>
                            {!this.state.changeAvatar ?
                                <div>
                                    <img
                                        src={this.props.data ? "data:image/png;base64," + this.props.data.image : img}
                                        alt="" className="loginIcon py-2"/><br/>
                                    <h6 onClick={this.changePicture}>Change picture!</h6><br/>
                                </div> :
                                <div>
                                    <img
                                        src={this.props.data ? "data:image/png;base64," + this.props.data.image : img}
                                        style={{width: "80px", height: "80px"}}
                                        alt="Preview"/>
                                    <div className="avatar py-2">
                                        <Avatar
                                            width={390}
                                            height={295}
                                            onCrop={this.onCrop}
                                            onClose={this.onClose}
                                            src={this.state.src}
                                            email={"da"}
                                        /></div>
                                    <h6 onClick={this.doneChangePicture}>SavePicture!</h6><br/>
                                </div>
                            }
                            <label
                                className="py-2 px-2">USERNAME: {this.props.data ? this.props.data.username : null}</label><br/>
                            <label
                                className="py-2 px-2">E-MAIL: {this.props.data ? this.props.data.email : null}</label>
                            <div className="col">
                                <Button variant="primary" className="modalButton py-2 px-2"
                                        onClick={this.resetPassToggle}>Reset password</Button>
                                <Button variant="primary" className="modalButton py-2 px-2"
                                        onClick={this.props.closeEditUserModal}>Exit</Button>
                            </div>
                        </div>}
                        {this.state.resetPassToggle &&
                        <div>
                            <img src={this.props.data?.image ? "data:image/png;base64," + this.props.data.image : img}
                                 alt="" className="loginIcon py-2"/><br/>
                            <label className="py-2 px-2">OLD PASSWORD</label><input type="password"
                                                                                    onChange={this.changeOldPasswordInput}/><br/>
                            <label className="py-2 px-2">NEW PASSWORD</label><input type="password"
                                                                                    onChange={this.changeNewPasswordInput}/><br/>
                            <Button variant="primary" className="modalButton py-2 px-2"
                                    onClick={() => this.resetPassword(this.state.password, this.state.newPassword)}>Save</Button>
                            <Button variant="primary" className="modalButton py-2 px-2"
                                    onClick={this.resetPassToggle}>Exit</Button>
                        </div>}
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    const {isLoggedIn, showLogin, showEditUser, data} = state.loginContext;
    return {
        isLoggedIn, showLogin, showEditUser, data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeEditUserModal: () => {
            dispatch(setShowEditUser(false))
        },
        resetUserPassword: (id, newPassword) => {
            dispatch(updateUser(id, newPassword))
        },
        resetUserImage: (id, image) => {
            dispatch(updateUserImage(id, image.substring(image.indexOf(',') + 1)))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserModal)
