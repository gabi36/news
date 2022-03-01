import React from "react";
import {connect} from "react-redux";
import {Button, Col, Form} from "react-bootstrap";

class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            source: "all",
            startDate: "",
            endDate: "",
            sourceArticle:[]
        }

        this.changeCategory = this.changeCategory.bind(this)
        this.changeStartDate = this.changeStartDate.bind(this)
        this.changeEndDate = this.changeEndDate.bind(this)
    }

    changeCategory = (e) => {
        this.setState({
            source: e.target.value
        })
    }

    changeStartDate = (e) => {
        this.setState({
            startDate: e.target.value
        })
    }

    changeEndDate = (e) => {
        this.setState({
            endDate: e.target.value
        })
    }

    searchFilteredArticles = () => {
        this.props.onChange(this.state.source, this.state.startDate, this.state.endDate)
    }

    render() {
        return (
            <div>{
                this.props.login.isLoggedIn &&
                <div className="filterComponents">
                    <h1>Filter Articles</h1>

                    <Form>
                        <Form.Row className="align-items-center">
                            <Col xs="auto" className="my-1">
                                <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly
                                            style={{marginRight: "10px"}}>
                                    Select Source:
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    custom
                                    style={{backgroundColor: "transparent", border: "none", width: "100px"}}
                                    onChange={this.changeCategory}
                                >
                                    <option value="all">all</option>
                                    <option value="CNN">CNN</option>
                                    <option value="NBC News">NBC News</option>
                                    <option value="BBC News">BBC News</option>
                                    <option value="Reuters">Reuters</option>
                                    <option value="Daily Beast">Daily Beast</option>
                                    <option value="Fos News">Fox News</option>
                                    <option value="Business Insider">Business Insider</option>
                                    <option value="Hollywood Reporter">Hollywood Reporter</option>
                                    <option value="Yahoo Entertainment">Yahoo Entertainment</option>
                                    <option value="CBS Sports">CBS Sports</option>
                                    <option value="YouTube">YouTube</option>
                                    <option value="MarketWatch">MarketWatch</option>
                                    <option value="CoinDesk">CoinDesk</option>
                                    <option value="CNBN">CNBN</option>
                                    <option value="Space.com">Space.com</option>
                                    <option value="Variety">Variety</option>
                                    <option value="Fox Business">Fox Business</option>
                                    <option value="The Verge">The Verge</option>
                                    <option value="Financial Times">Financial Times</option>
                                    <option value="Vulture">Vulture</option>
                                    <option value="Independent">Independent</option>
                                    <option value="BBC News">BBC News</option>
                                    <option value="SciTechDaily">SciTechDaily</option>
                                    <option value="Daily Beast">Daily Beast</option>
                                </Form.Control>
                            </Col>
                            <Col xs="auto" className="my-1">
                            <span>
                            <Form.Label
                                style={{marginRight: "10px"}}>
                                Start Date:
                            </Form.Label>
                            <Form.Control type="date"
                                          placeholder="Select start date" style={{width: "130px", color: "black"}}
                                          custom onChange={this.changeStartDate}/>
                            </span>
                            </Col>
                            <Col sc="auto" className="my-1">
                                <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly
                                            style={{marginRight: "10px"}}>
                                    End Date:
                                </Form.Label>
                                <Form.Control type="date"
                                              placeholder="Select end date" style={{width: "130px", color: "black"}}
                                              custom
                                              onChange={this.changeEndDate}/>
                            </Col>
                            <Col sc="auto" className="my-1">
                                <Button variant="primary" onClick={this.searchFilteredArticles}>Search</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </div>
            }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const login = state.loginContext;
    const article = state.articleContext;
    return {login, article}
}

export default connect(mapStateToProps)(Filter)