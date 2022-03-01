import React from "react";
import {connect} from "react-redux";
import {fetchArticle, fetchSavedArticle} from "./redux/action/articleAction";
import LoginModal from "./components/LoginModal";
import ViewUserModal from "./components/ViewUserModal";
import Menu from "./components/Menu";
import Article from "./components/Article";
import Toggle from "./components/Toggle";
import Filter from "./components/Filter";
import {Col, Row} from "react-bootstrap";
import img from "./assets/img.png"

class Container extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            source: "all",
            startDate: "2021-10-10",
            endDate: "2100-10-10",
            checked: true,
            avatar: img,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleToggleChange = this.handleToggleChange.bind(this)
        this.handleChangeAvatar = this.handleChangeAvatar.bind(this)
    }

    componentDidMount() {
        this.props.getArticle();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.checked !== this.state.checked || prevState.source !== this.state.source || prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate)
            if (this.state.checked === false)
                this.props.getSavedArticle(this.props.loginContext.data.id, this.state.source, this.state.startDate, this.state.endDate);
            else
                this.props.getArticle();
        if (this.props.loginContext.isLoggedIn === false && this.state.checked === false) {
            this.setState({
                checked: true,
            })
        }
    }

    handleChange(source, startDate, endDate) {
        this.setState({source, startDate, endDate})
    }

    handleToggleChange(checked) {
        this.setState({checked})
    }

    handleChangeAvatar(avatar) {
        this.setState({avatar})
    }

    render() {
        return (
            <div>
                <Menu avatar={this.props.loginContext.data?.image? "data:image/png;base64,"+this.props.loginContext.data.image:img}/>
                <LoginModal/>
                <ViewUserModal avatar={this.state.avatar} onChange={this.handleChangeAvatar}/>
                {this.props.loginContext.isLoggedIn ?
                    <div className="py-2">
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={3} xl={3}>
                                <Filter onChange={this.handleChange}/>
                                <Toggle onChange={this.handleToggleChange} checked={this.state.checked}/>
                            </Col>
                            <Col xs={12} xm={12} md={12} lg={9} xl={9}>
                                <Article source={this.state.source} startDate={this.state.startDate}
                                         endDate={this.state.endDate} checked={this.state.checked}/>
                            </Col>
                        </Row>
                    </div> :
                    <div className="py-2">
                        <Article source={this.state.source} startDate={this.state.startDate}
                                 endDate={this.state.endDate} checked={true}/>
                    </div>
                }
            </div>
        )
    }
}

const
    mapStateToProps = (state) => {
        const loginContext = state.loginContext;
        const articleContext = state.articleContext;
        return {
            loginContext, articleContext
        }
    }

const
    mapDispatchToProps = (dispatch) => {
        return {
            getArticle: () => {
                dispatch(fetchArticle())
            },
            getSavedArticle: (id, source, startDate, endDate) => {
                dispatch(fetchSavedArticle(id, source, startDate, endDate))
            }
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(Container);