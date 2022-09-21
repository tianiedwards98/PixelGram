package com.cognizant.kpusercrud.controller;

import com.cognizant.kpusercrud.models.AuthTokenRequest;
import com.cognizant.kpusercrud.models.KeycloakResponse;
import com.cognizant.kpusercrud.models.RegistrationRequest;
import com.cognizant.kpusercrud.service.KeycloakService;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class Controller {

    private KeycloakService service;

    @Autowired
    public Controller(KeycloakService service) {
        this.service = service;
    }

    @PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public KeycloakResponse getAuthorizedTokenFromUserAndPass(AuthTokenRequest request) throws FeignException {
        return service.getAuthorizedToken(request);
    }

    @PostMapping(value = "/register",consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void createRegisteredUser(@RequestBody RegistrationRequest request){

    }

}
