package com.cognizant.kpusercrud.service;

import com.cognizant.kpusercrud.feign.KeycloakFeignClient;
import com.cognizant.kpusercrud.models.AuthTokenRequest;
import com.cognizant.kpusercrud.models.KeycloakResponse;
import feign.FeignException;
import org.springframework.stereotype.Service;

@Service
public class KeycloakService {

    private KeycloakFeignClient client;

    public KeycloakService(KeycloakFeignClient client) {
        this.client = client;
    }

    public KeycloakResponse getAuthorizedToken(AuthTokenRequest request) throws FeignException {
        return client.getAuthorizedToken(request);
    }
}
