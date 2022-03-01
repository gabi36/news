package news.article;

public class ArticleMapper {
	public static ArticleDto entityToDto(ArticleEntity entity) {
		ArticleDto dto = new ArticleDto();
		dto.setId(entity.getId());
		dto.setUrlImage(entity.getUrlImage());
		dto.setTitle(entity.getTitle());
		dto.setDescription(entity.getDescription());
		dto.setSource(entity.getSource());
		dto.setAuthor(entity.getAuthor());
		dto.setPublishDate(entity.getPublishDate());
		dto.setUrlArticle(entity.getUrlArticle());
		return dto;
	}
	
	public static ArticleEntity dtoToEntity(ArticleDto dto) {
		ArticleEntity entity = new ArticleEntity();
		entity.setId(dto.getId());
		entity.setUrlImage(dto.getUrlImage());
		entity.setTitle(dto.getTitle());
		entity.setDescription(dto.getDescription());
		entity.setSource(dto.getSource());
		entity.setAuthor(dto.getAuthor());
		entity.setPublishDate(dto.getPublishDate());
		entity.setUrlArticle(dto.getUrlArticle());
		return entity;
	}
}