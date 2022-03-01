package news.article;

import lombok.Data;

import java.sql.Date;

@Data
public class ArticleDto {
	private Integer id;

	private String urlImage;

	private String title;

	private String description;

	private String source;

	private String author;
	
	private Date publishDate;

	private String urlArticle;
}
