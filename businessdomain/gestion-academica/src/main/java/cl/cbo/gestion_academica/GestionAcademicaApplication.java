package cl.cbo.gestion_academica;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "http://localhost:5173")
public class GestionAcademicaApplication {

    public static void main(String[] PREFIX) {
        SpringApplication.run(GestionAcademicaApplication.class, PREFIX);
    }
}
=======

@SpringBootApplication
public class GestionAcademicaApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestionAcademicaApplication.class, args);
	}

}
>>>>>>> feature/colegio-frontend
