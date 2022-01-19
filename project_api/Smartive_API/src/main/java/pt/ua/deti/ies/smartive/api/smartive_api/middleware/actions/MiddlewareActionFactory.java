package pt.ua.deti.ies.smartive.api.smartive_api.middleware.actions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pt.ua.deti.ies.smartive.api.smartive_api.utils.RequestType;

import java.lang.reflect.Constructor;

@Component
public class MiddlewareActionFactory {

    private MiddlewareActionDependencyInjector middlewareActionDependencyInjector;

    @Autowired
    public MiddlewareActionFactory(MiddlewareActionDependencyInjector middlewareActionDependencyInjector) {
        this.middlewareActionDependencyInjector = middlewareActionDependencyInjector;
    }

    public MiddlewareAction generate(String endpointUrl, RequestType requestType, Object... args) {

        for (MiddlewareActionsRegister middlewareActionsRegister : MiddlewareActionsRegister.values()) {

            if (middlewareActionsRegister.getEndpointUrl().equalsIgnoreCase(endpointUrl) && middlewareActionsRegister.getRequestType() == requestType) {

                Class<? extends MiddlewareAction> classExecutor = middlewareActionsRegister.getClassExecutor();
                Constructor<? extends MiddlewareAction> classConstructor = null;

                try {
                    classConstructor = classExecutor.getConstructor(MiddlewareActionDependencyInjector.class, Object[].class);
                    return classConstructor.newInstance(middlewareActionDependencyInjector, args);
                } catch (ReflectiveOperationException e) {
                    e.printStackTrace();
                }

            }

        }

        return null;

    }

}
