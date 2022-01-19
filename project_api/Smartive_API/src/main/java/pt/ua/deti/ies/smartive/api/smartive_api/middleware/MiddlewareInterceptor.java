package pt.ua.deti.ies.smartive.api.smartive_api.middleware;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.actions.MiddlewareActionFactory;
import pt.ua.deti.ies.smartive.api.smartive_api.utils.RequestType;

@Component
public class MiddlewareInterceptor {

    private final MiddlewareActionFactory middlewareActionFactory;

    @Autowired
    public MiddlewareInterceptor(MiddlewareActionFactory middlewareActionFactory) {
        this.middlewareActionFactory = middlewareActionFactory;
    }

    public void interceptRequest(String requestURI, RequestType method, Object body) {
        middlewareActionFactory.generate(requestURI, method, body).process();
    }

}
