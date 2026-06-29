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
public class GlobalPreFiltering implements GlobalFilter, Ordered {

    private final Logger log = LoggerFactory.getLogger(GlobalPreFiltering.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        log.info("Global Pre-Filter ejecutado: Procesando peticion hacia el colegio...");
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return 1;
    }
}