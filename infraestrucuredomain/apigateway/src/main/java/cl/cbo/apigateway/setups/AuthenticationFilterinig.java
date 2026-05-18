package cl.cbo.apigateway.setups;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFilterinig extends AbstractGatewayFilterFactory<AuthenticationFilterinig.Config> {

    private final Logger log = LoggerFactory.getLogger(AuthenticationFilterinig.class);

    public AuthenticationFilterinig() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            log.info("Filtro de Autenticacion ejecutado.");
            // Aqui el profesor validara los tokens de Keycloak mas adelante
            return chain.filter(exchange);
        };
    }

    public static class Config {
        // Parametros de configuracion del filtro si se necesitan
    }
}