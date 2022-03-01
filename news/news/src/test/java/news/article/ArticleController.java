package news.article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

@RestController
@RequestMapping(value="/articles")
public class ArticleController {
	
	@Autowired
	private ArticleService articleService;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/{id}")
	public ArticleDto createArticle(@PathVariable Integer id, @RequestBody ArticleDto articleDto) {
		return articleService.createArticle(id, articleDto);
	}
	
	@GetMapping
	public List<ArticleDto> readArticles(){
		return articleService.readAll();
	}
	
	@DeleteMapping("/{id}")
	public ArticleDto deleteteArticle(@PathVariable Integer id) {
		return articleService.deleteArticle(id);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/filteredAricles/{id}")
	public List<ArticleDto> readFilteredArticles(@PathVariable Integer id,
												 @RequestParam(value="source", required=false, defaultValue="all") String source,
												 @RequestParam(value="startDate", required=false, defaultValue="2000-10-10") String startDate,
												 @RequestParam(value="endDate", required=false, defaultValue="2100-07-11") String endDate) throws ParseException{
		return articleService.readFilteredArticles(id, source, new SimpleDateFormat("yyyy-MM-dd").parse(startDate), new SimpleDateFormat("yyyy-MM-dd").parse(endDate));
	}
}
