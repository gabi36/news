export const API = {
    ARTICLE_SERVICE_URL: `https://newsapi.org/v2/top-headlines?country=us&apiKey=852884d56250496e8e231402656c24ea`,
    LOGIN_USER_SERVICE_URL: `http://localhost:8080/news/users/login`,
    UPDATE_USER_SERVICE_URL:(id)=> `http://localhost:8080/news/users/${id}`,
    SAVE_ARTICLE_SERVICE_URL:(id)=> `http://localhost:8080/news/articles/${id}`,
    DB_FILTERED_ARTICLE_SERVICE_URL:(id, source, startDate, endDate)=> `http://localhost:8080/news/articles/filteredAricles/${id}?source=${source}&startDate=${startDate}&endDate=${endDate}`,
    DELETE_ARTICLE_FROM_USER_SERVICE_URL:(idUser, idArticle)=> `http://localhost:8080/news/users/deleteArticleFromUser/${idUser}/${idArticle}`
}