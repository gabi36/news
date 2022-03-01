import React from "react";
import {connect} from "react-redux";
import {generateIdForItems} from "../common/Utils";
import {Button, Card, Col, Row} from "react-bootstrap";
import "../css/My.css"
import {FcLikePlaceholder} from "react-icons/all";
import {deleteArticle, fetchSavedArticle, saveArticle} from "../redux/action/articleAction";


const Article = (props) => {
    const checked = props.checked;
    let articleList = null;
    if (checked) {
        articleList = props.articleList.articles;
    }
    else {
        articleList = props.articleList;
    }
    const articleListWithIds = generateIdForItems(articleList)

    const returnArticle = (article) => {
        let publishedAt, articleSource;
        if (checked) {
            publishedAt = article.item.publishedAt.substring(0, 10)
            articleSource = article.item.source.name;
        } else {
            publishedAt = article.item.publishDate
            articleSource = article.item.source
        }

        if (((props.startDate === "" && props.endDate === "") || (props.startDate <= publishedAt && props.endDate >= publishedAt)) && (props.source === articleSource || props.source === "all"))
            return true
    }

    const handleFavoriteButton = async (data, articleId) => {
        if (props.isLoggedIn) {
            if (checked) {
                props.saveArticle(props.userId.id, data)
                alert("Article saved to favorite!")
            } else {
                await props.deleteArticle(props.userId.id, articleId)
                alert("Article deleted from favorite!")
            }
        } else {
            alert("Please, login before saving an article to favorite!")
        }
    }

    return (
        <div className="cardDeck" style={{overflow:"scroll", height:"100vh"}}>
            <Row>
                {articleListWithIds && articleListWithIds.map((article, key) => {
                    key = article.id;
                    const readMore = () => {
                        let url;
                        if(checked){
                            url = article.item.url
                        }
                        else{
                            url = article.item.urlArticle
                        }
                        window.open(url)
                    }

                    let data = {
                        id: article.id,
                        urlImage: article.item.urlToImage,
                        title: article.item.title,
                        description: article.item.description,
                        source: article.item.source.name,
                        author: article.item.author,
                        publishDate: article.item.publishedAt,
                        urlArticle: article.item.url

                    }

                    let imgUrl, source;
                    if (checked) {
                        imgUrl = article.item.urlToImage;
                        source = article.item.source.name;
                    } else {
                        imgUrl = article.item.urlImage
                        source = article.item.source
                    }

                    let articleId = article.item.id

                    let xl
                    if(props.isLoggedIn)
                        xl=4
                    else
                        xl=3

                    if (returnArticle(article))
                        return (
                            <Col xs={12} sm={12} md={6} lg={6} xl={xl} xxl={3}key={key}>
                                <Card style={{backgroundColor: "black", color: "#1FD7FE"}}>
                                    <Card.Img variant="top" style={{height: "250px"}}
                                              src={imgUrl}
                                              className="py-2"/>

                                    <Card.Header>
                                        <Card.Title style={{height: "55px"}}>
                                            <h6>{article.item.title}</h6><br/>
                                        </Card.Title>
                                    </Card.Header>

                                    <Card.Body className="card" style={{backgroundColor: "black"}}>
                                        <Card.Text style={{height: "100px"}}>
                                            {article.item.description &&
                                            article.item.description.substring(0, 100)}...<br/><br/>
                                        </Card.Text>
                                        <Card.Text style={{textAlign: "left", height: "75px"}}>
                                            Source: {source}<br/>
                                            {article.item.author !== null ?
                                                <div>
                                                    <>Author: {article.item.author.substring(0, 25)}... </>
                                                    <br/>
                                                </div>
                                                : null
                                            }
                                            {checked ?
                                                <>Published at: {article.item.publishedAt.substring(0, 10)}</> :
                                                <>Published at: {article.item.publishDate}</>
                                            }
                                        </Card.Text>
                                    </Card.Body>

                                    <Card.Footer style={{height: "150px"}}>
                                        <span>
                                            <FcLikePlaceholder size={30}
                                                               onClick={() => handleFavoriteButton(data, articleId)}/>
                                            <div className="readMoreButton py-4">
                                                <Button variant="primary" onClick={readMore}>Read Mode</Button>
                                            </div>
                                        </span>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        )
                    else
                        return null
                })}
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => {
    const articleList = state.articleContext.articleList;
    const userId = state.loginContext.data
    const isLoggedIn = state.loginContext.isLoggedIn;
    return {articleList, userId, isLoggedIn}
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveArticle: (userId, data) => {
            dispatch(saveArticle(userId, data.id, data.urlImage, data.title, data.description, data.source, data.author, data.publishDate, data.urlArticle))
        },
        deleteArticle: (userId, articleId) => {
            dispatch(deleteArticle(userId, articleId))
        },
        getSavedArticle: (id, source='all', startDate="", endDate="") => {
            console.log("da")
            dispatch(fetchSavedArticle(id, source, startDate, endDate))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)

