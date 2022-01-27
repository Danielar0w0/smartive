package pt.ua.deti.ies.smartive.api.smartive_api.exceptions;

public class InvalidPermissionsException extends RuntimeException {

    public InvalidPermissionsException(String message) {
        super(message);
    }

    public InvalidPermissionsException() {
        super("You don't have permission to perform that action.");
    }
}
