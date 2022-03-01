package news;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class RunNewsServices {
	
	public static void main(String[] args) {
		SpringApplication.run(RunNewsServices.class, args);
	}

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/news/**");
            }
        };
    }
}

// https://spring.io/quickstart
// https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html
// https://spring.io/guides/gs/rest-service/
// https://spring.io/guides/gs/consuming-rest/
// https://www.baeldung.com/rest-template
// https://newsapi.org/docs/get-started
// https://newsapi.org/s/romania-sports-news-api
// https://spring.io/guides/gs/rest-service-cors/