package cl.cbo.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApigatewayApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(ApigatewayApplication.class);
        app.setWebApplicationType(WebApplicationType.REACTIVE); 
        app.run(args);
    }
}