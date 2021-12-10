package pt.ua.deti.ies.smartive.api.smartive_api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import pt.ua.deti.ies.smartive.api.smartive_api.model.devices.Device;

import java.util.Date;

@ControllerAdvice
public class ExceptionHandler {

    @org.springframework.web.bind.annotation.ExceptionHandler(DeviceNotFoundException.class)
    public ResponseEntity<?> deviceNotFoundException(DeviceNotFoundException deviceNotFoundException, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(new Date(), deviceNotFoundException.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(InvalidDeviceException.class)
    public ResponseEntity<?> invalidDeviceException(InvalidDeviceException invalidDeviceException, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(new Date(), invalidDeviceException.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

}
