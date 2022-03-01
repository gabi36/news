package news.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/users")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping
	public UserDto createUser(@RequestBody UserDto userDto) {
		return userService.createUser(userDto);
	}

	@GetMapping
	public List<UserDto> readUsers() {
		return userService.realAll();
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping("/{id}")
	public UserDto updateUser(@PathVariable Integer id, @RequestBody UserDto userDto) {
		return userService.updateUser(id, userDto);
	}

	@DeleteMapping("/{id}")
	public UserDto deleteteUser(@PathVariable Integer id) {
		return userService.deleteUser(id);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/login")
	public ResponseEntity<UserDto> login(@RequestBody UserDto userDto) {
		return userService.login(userDto);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/deleteArticleFromUser/{idUser}/{idArticle}")
	public Integer deleteArticleFromUser(@PathVariable Integer idUser, @PathVariable Integer idArticle) {
		return userService.deleteArticleFromUser(idUser, idArticle);
	}
}