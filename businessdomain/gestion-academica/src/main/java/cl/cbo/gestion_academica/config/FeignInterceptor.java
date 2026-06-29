package cl.cbo.gestion_academica.config; // Revisa que calce con tu ruta de paquetes

import feign.RequestInterceptor;
import feign.RequestTemplate;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
public class FeignInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        // 🛠️ CORRECCIÓN: El método correcto de Spring es .getRequestAttributes()
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        
        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            String authorizationHeader = request.getHeader("Authorization");

            // Si la petición original de React trae el token, se lo clonamos a la llamada de Feign
            if (authorizationHeader != null) {
                template.header("Authorization", authorizationHeader);
            }
        }
    }
}