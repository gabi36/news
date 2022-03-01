 package news.user;

 import news.article.ArticleEntity;
 import news.article.ArticleRepository;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.http.HttpStatus;
 import org.springframework.http.ResponseEntity;
 import org.springframework.stereotype.Service;

 import java.util.List;
 import java.util.stream.Collectors;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ArticleRepository articleRepository;

	public UserDto createUser(UserDto userDto) {
		userRepository.save(UserMapper.dtoToEntity(userDto));
		return userDto;
	}

	public List<UserDto> realAll() {
		return userRepository.findAll().stream().map(UserMapper::entityToDto).collect(Collectors.toList());
	}

	public UserDto updateUser(Integer id, UserDto userDto) {
		UserEntity userEntity = userRepository.getOne(id);
		if (userDto.getUsername() != null)
			userEntity.setUsername(userDto.getUsername());
		if (userDto.getEmail() != null)
			userEntity.setEmail(userDto.getEmail());
		if (userDto.getPassword() != null)
			userEntity.setPassword(userDto.getPassword());
		if (userDto.getImage() != null)
			userEntity.setImage(userDto.getImage());
		userRepository.save(userEntity);
		return UserMapper.entityToDto(userEntity);
	}

	public UserDto deleteUser(Integer id) {
		UserEntity userEntity = userRepository.getOne(id);
		userEntity.getArticles().clear();
		userRepository.deleteById(id);
		return UserMapper.entityToDto(userEntity);
	}

	public ResponseEntity<UserDto> login(UserDto userDto) {
		List<UserEntity> users = userRepository.findAll();
		for (int i = 0; i < users.size(); i++) {
			if (users.get(i).getEmail().equals(userDto.getEmail()) && users.get(i).getPassword().equals(userDto.getPassword())) {
				return new ResponseEntity<UserDto>(UserMapper.entityToDto(users.get(i)), HttpStatus.OK);
			}
		}
		return null;
	}

	public Integer deleteArticleFromUser(Integer idUser, Integer idArticle) {
		UserEntity userEntity = userRepository.getOne(idUser);
		ArticleEntity articleEntity = null;
		for (int i = 0; i < userEntity.getArticles().size(); i++) {
			if (userEntity.getArticles().get(i).getId() == idArticle) {
				articleEntity = userEntity.getArticles().get(i);
				userEntity.getArticles().remove(i);
				if (articleEntity.getUsers().size() == 1)
					articleRepository.delete(articleEntity);
				userRepository.save(userEntity);
			}
		}
		return idUser;
	}
}
