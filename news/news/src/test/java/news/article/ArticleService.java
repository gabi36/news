package news.article;

import news.user.UserEntity;
import news.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleService {

	@Autowired
	private ArticleRepository articleRepository;

	@Autowired
	private UserRepository userRepository;

	public ArticleDto createArticle(Integer id, ArticleDto articleDto) {
		UserEntity userEntity = userRepository.getOne(id);
		List<ArticleEntity> articlesEntity = articleRepository.findAll();
		ArticleEntity articleEntity = null;

		int index = -1;
		for (int i = 0; i < articlesEntity.size(); i++) {
			if (articlesEntity.get(i).getTitle().equals(articleDto.getTitle())) {
				index = i;
			}
		}

		boolean exist = false;
		for (int i = 0; i < userEntity.getArticles().size(); i++) {
			if (userEntity.getArticles().get(i).getTitle().equals(articleDto.getTitle()))
				exist = true;
		}

		if (!exist) {
			if (index == -1) {
				articleEntity = ArticleMapper.dtoToEntity(articleDto);
			} else {
				articleEntity = articlesEntity.get(index);
			}
			userEntity.getArticles().add(articleEntity);
			userRepository.save(userEntity);
		}
		return ArticleMapper.entityToDto(articleEntity);

	}

	public List<ArticleDto> readAll() {
		return articleRepository.findAll().stream().map(ArticleMapper::entityToDto).collect(Collectors.toList());
	}

	public ArticleDto deleteArticle(Integer id) {
		ArticleEntity articleEntity = articleRepository.getOne(id);
		articleEntity.getUsers().clear();
		articleRepository.deleteById(id);
		return ArticleMapper.entityToDto(articleEntity);
	}

	public List<ArticleDto> readFilteredArticles(Integer id, String source, Date startDate, Date endDate) {
		UserEntity userEntity = userRepository.getOne(id);
		List<ArticleDto> articlesDto = userEntity.getArticles().stream().map(ArticleMapper::entityToDto)
				.collect(Collectors.toList());
		List<ArticleDto> articlesDtoFiltered = new ArrayList<>();
		for (int i = 0; i < articlesDto.size(); i++) {
			if (articlesDto.get(i).getPublishDate().after(startDate) && articlesDto.get(i).getPublishDate().before(endDate) && (articlesDto.get(i).getSource().equals(source) || source.equals("all")))
				articlesDtoFiltered.add(articlesDto.get(i));
		}
		return articlesDtoFiltered;
	}
}
