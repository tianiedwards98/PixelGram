package com.cognizant.kpusercrud.controller;

import com.cognizant.kpusercrud.feign.KeycloakFeignClient;
import com.cognizant.kpusercrud.models.AuthTokenRequest;
import com.cognizant.kpusercrud.models.KeycloakResponse;
import com.cognizant.kpusercrud.service.KeycloakService;
import feign.FeignException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doReturn;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class ControllerIT {

    @MockBean
    KeycloakFeignClient client;

    KeycloakService service;
    Controller controller;

    AuthTokenRequest testRequest1, testRequest2;
    KeycloakResponse testResponse1, testResponse2;

    @BeforeEach
    void setUp() {
        testRequest1 = new AuthTokenRequest(
                "bob",
                "builderman",
                "cheerios",
                "password"
        );
        testRequest2 = new AuthTokenRequest(
                "testy.boy",
                "blankenship",
                "cheerios",
                "password"
        );
        testResponse1 = new KeycloakResponse("hello", "refresh");
        testResponse2 = new KeycloakResponse("world", "refresh");

        doReturn(testResponse2).when(client).getAuthorizedToken(testRequest2);
        doReturn(testResponse1).when(client).getAuthorizedToken(testRequest1);

        service = new KeycloakService(client);
        controller = new Controller(service);
    }

    @Test
    void shouldReturnResponseObjectWithHelloOrWorldTokenWhenPassedTestRequests() throws FeignException {

        KeycloakResponse response = controller.getAuthorizedTokenFromUserAndPass(testRequest1);
        assertEquals(testResponse1, response);
        KeycloakResponse response2 = controller.getAuthorizedTokenFromUserAndPass(testRequest2);
        assertEquals(testResponse2, response2);

    }

}
