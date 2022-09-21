package com.cognizant.kpusercrud.controller;

import com.cognizant.kpusercrud.models.AuthTokenRequest;
import com.cognizant.kpusercrud.models.Credentials;
import com.cognizant.kpusercrud.models.KeycloakResponse;
import com.cognizant.kpusercrud.models.RegistrationRequest;
import com.cognizant.kpusercrud.service.KeycloakService;
import com.fasterxml.jackson.databind.ObjectMapper;
import feign.FeignException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;

import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(Controller.class)
class ControllerTest {

    @Autowired
    MockMvc mvc;

    ObjectMapper mapper = new ObjectMapper();

    @MockBean
    KeycloakService service;

    AuthTokenRequest testRequest1, testRequest2;
    KeycloakResponse testResponse1, testResponse2;
    RegistrationRequest testRegistration1,testRegistration2;


    @BeforeEach
    void setUp() throws FeignException {
        testRegistration1 = new RegistrationRequest(
                "spongebob",
                Collections.singletonList(new Credentials("password"))
        );
        testRegistration2 = new RegistrationRequest(
                "jimmy_neutron",
                Collections.singletonList(new Credentials("hi_im_carl"))
        );

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
        doReturn(testResponse2).when(service).getAuthorizedToken(testRequest2);
        doReturn(testResponse1).when(service).getAuthorizedToken(testRequest1);

    }

    String buildUrlEncodedFormEntity(String... params) {
        if( (params.length % 2) > 0 ) {
            throw new IllegalArgumentException("Need to give an even number of parameters");
        }
        StringBuilder result = new StringBuilder();
        for (int i=0; i<params.length; i+=2) {
            if( i > 0 ) {
                result.append('&');
            }
            try {
                result.
                        append(URLEncoder.encode(params[i], StandardCharsets.UTF_8.name())).
                        append('=').
                        append(URLEncoder.encode(params[i+1], StandardCharsets.UTF_8.name()));
            }
            catch (UnsupportedEncodingException e) {
                throw new RuntimeException(e);
            }
        }
        return result.toString();
    }

    @Test
    void shouldReturnHelloWhenGivenTestRequest1() throws Exception {

        String output = mapper.writeValueAsString(testResponse1);

        mvc.perform(post("/auth")
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .content(buildUrlEncodedFormEntity("username", "bob", "password", "builderman", "client_id", "cheerios", "grant_type", "password")))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().json(output));

    }

    @Test
    public void shouldReturnWorldWhenGivenTestRequest2() throws Exception {

        String output = mapper.writeValueAsString(testResponse2);

        mvc.perform(post("/auth")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .content(buildUrlEncodedFormEntity("username", "testy.boy", "password", "blankenship", "client_id", "cheerios", "grant_type", "password")))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().json(output));

    }

    @Test
    public void shouldReturn201WhenUserRegistrationRequestIsPosted() throws Exception{

        String input = mapper.writeValueAsString(testRegistration1);

        mvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(input))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    public void shouldReturnInvalidArgument() throws Exception{
        String input = mapper.writeValueAsString(testRequest1);
        mvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(""))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }
}
