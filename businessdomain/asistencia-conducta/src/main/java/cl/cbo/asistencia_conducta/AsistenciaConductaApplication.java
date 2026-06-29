package cl.cbo.asistencia_conducta;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableDiscoveryClient
@SpringBootApplication
@EnableFeignClients(basePackages = "cl.cbo.asistencia_conducta.clients")
public class AsistenciaConductaApplication {

	public static void main(String[] args) {
		SpringApplication.run(AsistenciaConductaApplication.class, args);
	}

}
