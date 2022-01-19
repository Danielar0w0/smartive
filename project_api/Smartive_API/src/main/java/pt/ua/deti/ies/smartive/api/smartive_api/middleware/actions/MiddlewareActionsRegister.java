package pt.ua.deti.ies.smartive.api.smartive_api.middleware.actions;

import lombok.Getter;
import pt.ua.deti.ies.smartive.api.smartive_api.middleware.actions.implementations.ProcessTriggersAction;
import pt.ua.deti.ies.smartive.api.smartive_api.utils.RequestType;

@Getter
public enum MiddlewareActionsRegister {

    PROCESS_TRIGGERS("/middleware/devices/sensor", RequestType.PUT, ProcessTriggersAction.class);

    private final String endpointUrl;
    private final RequestType requestType;
    private final Class<? extends MiddlewareAction> classExecutor;

    MiddlewareActionsRegister(String endpointUrl, RequestType requestType, Class<? extends MiddlewareAction> classExecutor) {
        this.endpointUrl = endpointUrl;
        this.requestType = requestType;
        this.classExecutor = classExecutor;
    }

}
