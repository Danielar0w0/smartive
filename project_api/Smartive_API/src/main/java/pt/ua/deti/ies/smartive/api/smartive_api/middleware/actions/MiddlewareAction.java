package pt.ua.deti.ies.smartive.api.smartive_api.middleware.actions;

import lombok.Getter;

@Getter
public abstract class MiddlewareAction {

    private final MiddlewareActionDependencyInjector middlewareActionDependencyInjector;
    private final Object[] args;

    public MiddlewareAction(MiddlewareActionDependencyInjector middlewareActionDependencyInjector, Object[] args) {
        this.middlewareActionDependencyInjector = middlewareActionDependencyInjector;
        this.args = args;
    }

    public abstract boolean process();

}
