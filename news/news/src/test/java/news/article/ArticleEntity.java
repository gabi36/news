package news.article;

import lombok.Data;
import lombok.NoArgsConstructor;
import news.user.UserEntity;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "article")
public class ArticleEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@Column(name = "url_image")
	private String urlImage;

	@Column(name = "title")
	private String title;

	@Column(name = "description")
	private String description;

	@Column(name = "source")
	private String source;

	@Column(name = "author")
	private String author;

	@Column(name = "publish_date")
	private Date publishDate;

	@Column(name = "url_article")
	private String urlArticle;

	@ManyToMany(mappedBy="articles", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
	private List<UserEntity> users = new ArrayList<>();
}
