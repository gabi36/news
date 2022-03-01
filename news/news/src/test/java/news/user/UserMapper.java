package news.user;

public class UserMapper {
	public static UserDto entityToDto(UserEntity entity) {
		UserDto dto = new UserDto();
		dto.setId(entity.getId());
		dto.setUsername(entity.getUsername());
		dto.setEmail(entity.getEmail());
		dto.setPassword(entity.getPassword());
		dto.setImage(entity.getImage());
		return dto;
	}
	
	public static UserEntity dtoToEntity(UserDto dto) {
		UserEntity entity = new UserEntity();
		entity.setId(dto.getId());
		entity.setUsername(dto.getUsername());
		entity.setEmail(dto.getEmail());
		entity.setPassword(dto.getPassword());
		entity.setImage(dto.getImage());
		return entity;
	}
}
