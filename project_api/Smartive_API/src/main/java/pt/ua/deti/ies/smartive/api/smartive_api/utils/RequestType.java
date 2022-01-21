package pt.ua.deti.ies.smartive.api.smartive_api.utils;

public enum RequestType {
    POST,
    PUT,
    GET,
    DELETE;

    public static RequestType toRequestType(String requestTypeStr) {
        for (RequestType requestType : RequestType.values()) {
            if (requestType.toString().equalsIgnoreCase(requestTypeStr))
                return requestType;
        }
        return null;
    }

}
