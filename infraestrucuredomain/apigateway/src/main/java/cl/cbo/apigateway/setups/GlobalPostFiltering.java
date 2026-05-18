package cl.cbo.apigateway.setups;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class GlobalPostFiltering implements GlobalFilter, Ordered {

    private final Logger log = LoggerFactory.getLogger(GlobalPostFiltering.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
            log.info("Global Post-Filter ejecutado: Respuesta enviada con exito.");
        }));
    }

    @Override
    public int getOrder() {
        return 2;
    }
}