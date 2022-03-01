package news.user;

import lombok.Data;
import lombok.NoArgsConstructor;
import news.article.ArticleEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name="user")
public class UserEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;
	
	@Column(name="username")
	private String username;
	
	@Column(name="email")
	private String email;
	
	@Column(name="password")
	private String password;
	
	@Column(name="image")
	private byte[] image;
	
	@ManyToMany(fetch=FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
	@JoinTable(name="user_article",
			joinColumns= {
					@JoinColumn(name="user_id", referencedColumnName="id")
			},
			inverseJoinColumns= {
					@JoinColumn(name="article_id", referencedColumnName="id")
			})
	private List<ArticleEntity> articles = new ArrayList<>();

}
