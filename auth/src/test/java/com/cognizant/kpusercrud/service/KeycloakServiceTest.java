package com.cognizant.kpusercrud.service;

import com.cognizant.kpusercrud.feign.KeycloakFeignClient;
import com.cognizant.kpusercrud.models.AuthTokenRequest;
import com.cognizant.kpusercrud.models.KeycloakResponse;
import com.cognizant.kpusercrud.models.UnauthorizedUserException;
import feign.FeignException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.doThrow;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class KeycloakServiceTest {

    @MockBean
    KeycloakFeignClient client;

    KeycloakService service;

    AuthTokenRequest testRequest1, testRequest2, invalidTest;
    KeycloakResponse testResponse1, testResponse2;

    @BeforeEach
    void setUp() {
        invalidTest = new AuthTokenRequest();
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
        doThrow(new UnauthorizedUserException("Bad request man")).when(client).getAuthorizedToken(invalidTest);

        service = new KeycloakService(client);
    }

    @Test
    void shouldReturnHelloWhenGivenTestRequest1() throws FeignException {
        KeycloakResponse response = service.getAuthorizedToken(testRequest1);
        assertEquals("hello", response.getAccessToken());
    }

    @Test
    void shouldReturnWorldWhenGivenTestRequest2() throws FeignException {
        KeycloakResponse response = service.getAuthorizedToken(testRequest2);
        assertEquals("world", response.getAccessToken());
    }

    @Test
    void shouldThrowUnauthorizedUserExceptionWhenGivenInvalidUsernameAndPassword() throws FeignException {
        assertThrows(UnauthorizedUserException.class, () ->
                service.getAuthorizedToken(invalidTest)
        );
    }

}
