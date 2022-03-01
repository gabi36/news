import React from "react";
import {Button, Navbar, Nav} from "react-bootstrap";
import img from "../assets/img.png"
import "../css/My.css"
import {setIsLoggedIn, setShowEditUser, setShowLogin, setUser} from "../redux/action/loginAction";
import {connect} from "react-redux";

export const Menu = (props) => {

    return (
        <div>
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
                <Nav className="container-fluid">
                    <Nav.Item>
                        <Navbar.Brand className="nameNavBar" style={{color: '#1FD7FE'}}>NEWS FEED</Navbar.Brand>
                    </Nav.Item>
                        <Nav.Item className="mr-auto">
                            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                            <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav.Link>
                                {!props.isLoggedIn ?
                                    <div>
                                        <Button variant="outline-info" onClick={props.showLoginModal}
                                                className="loginLogout">Login</Button>
                                        <img src={img} alt="" className="menuIcon py-1"m onClick={()=>alert("Please, login to see user info!")}/>
                                    </div> :
                                    <div>
                                        <Button variant="outline-info" onClick={props.logout}
                                                className="loginLogout">Logout</Button>
                                        {
                                            <img src={props.avatar} alt="" className="menuIcon py-1"
                                             onClick={props.showEditUserModal}/>}
                                    </div>}

                            </Nav.Link>
                            </Navbar.Collapse>
                        </Nav.Item>

                </Nav>
            </Navbar>
        </div>
    )
}

const mapStateToProps = (state) => {
    const {isLoggedIn, showLogin, showEditUser, data} = state.loginContext;
    return {
        isLoggedIn, showLogin, showEditUser, data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showLoginModal: () => {
            dispatch(setShowLogin(true))
        },
        showEditUserModal: () => {
            dispatch(setShowEditUser(true))
        },
        logout: () => {
            dispatch(setIsLoggedIn(false))
            dispatch(setUser(null))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)