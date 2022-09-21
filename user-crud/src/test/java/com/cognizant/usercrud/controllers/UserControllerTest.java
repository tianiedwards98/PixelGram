package com.cognizant.usercrud.controllers;

import com.cognizant.usercrud.exceptions.MissingUsernameException;
import com.cognizant.usercrud.models.User;
import com.cognizant.usercrud.repo.UserRepo;
import com.cognizant.usercrud.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @MockBean
    private UserService userServiceMock;

    private UserRepo userRepo;

    private UserController userControllerWithMockService;

    private UserController userController;

    private UserService userService;

    private User testOutputUserForServiceMock1, testOutputUserForServiceMock2, testOutputUserForRepoMock1, testOutputUserForRepoMock2;

    @BeforeEach
    void setUp() {
        setupTestUsers();
        setupServiceMock();
        setupRepoMock();
        userControllerWithMockService = new UserController(userServiceMock);
        userService = new UserService(userRepo);
        userController = new UserController(userService);
    }

    @Test
    void shouldReturnUserAndStatusOkWhenPassedValidUsername() throws Exception{
        //Arrange
        String test1 = "http://localhost:3546/users?username=train";
        String test2 = "http://localhost:3546/users?username=plane";

        String expectedOutputFromTest1 = mapper.writeValueAsString(testOutputUserForServiceMock1);
        String expectedOutputFromTest2 = mapper.writeValueAsString(testOutputUserForServiceMock2);

        //Act & Assert

        mockMvc.perform(
                get(test1)
        )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().json(expectedOutputFromTest1));

        mockMvc.perform(
                get(test2)
        )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().json(expectedOutputFromTest2));
    }

    @Test
    public void shouldThrowMissingUsernameExceptionWhenMissingUsernameInGetByUsernamePath() throws Exception{
        String test1 = "http://localhost:3546/users";
        String test2 = "http://localhost:3546/users?username=";

        mockMvc.perform(
                get(test1)
        )
                .andDo(print())
                .andExpect(status().isBadRequest());

        mockMvc.perform(
                get(test2)
        )
                .andDo(print())
                .andExpect(status().isBadRequest());

    }

    @Test
    public void shouldReturnUserWhenRequestParamIsValidUnitTest() throws Exception{
        String test1 = "train";
        String test2 = "plane";

        User expectedResultOfTest1 = testOutputUserForServiceMock1;
        User expectedResultOfTest2 = testOutputUserForServiceMock2;

        User actualResultOfTest1 = userControllerWithMockService.getUserByUsername(test1);
        User actualResultOfTest2 = userControllerWithMockService.getUserByUsername(test2);

        assertEquals(expectedResultOfTest1, actualResultOfTest1);
        assertEquals(expectedResultOfTest2, actualResultOfTest2);

    }

    @Test
    public void shouldThrowMissingUsernameExceptionUnitTest() throws Exception{
        String test1 = null;
        String test2 = "";

        assertThrows(MissingUsernameException.class, () -> userControllerWithMockService.getUserByUsername(test1));
        assertThrows(MissingUsernameException.class, () -> userControllerWithMockService.getUserByUsername(test2));
    }

    @Test
    public void shouldReturnUserWhenRequestParamIsValidIntegrationTest() throws Exception{
        String test1 = "Oak";
        String test2 = "Elm";

        User expectedResultOfTest1 = testOutputUserForRepoMock1;
        User expectedResultOfTest2 = testOutputUserForRepoMock2;

        User actualResultOfTest1 = userController.getUserByUsername(test1);
        User actualResultOfTest2 = userController.getUserByUsername(test2);

        assertEquals(expectedResultOfTest1, actualResultOfTest1);
        assertEquals(expectedResultOfTest2, actualResultOfTest2);

    }

    @Test
    public void shouldThrowMissingUsernameExceptionIntegrationTest() throws Exception{
        String test1 = null;
        String test2 = "";

        assertThrows(MissingUsernameException.class, () -> userController.getUserByUsername(test1));
        assertThrows(MissingUsernameException.class, () -> userController.getUserByUsername(test2));
    }

    private void setupTestUsers(){
        testOutputUserForServiceMock1 = new User();
        testOutputUserForServiceMock1.setId(1);
        testOutputUserForServiceMock1.setUsername("train");
        testOutputUserForServiceMock1.setProfileImageUrl("www.train-image.com");

        testOutputUserForServiceMock2 = new User();
        testOutputUserForServiceMock2.setId(2);
        testOutputUserForServiceMock2.setUsername("plane");
        testOutputUserForServiceMock2.setProfileImageUrl("www.plain-image.com");

        testOutputUserForRepoMock1 = new User();
        testOutputUserForRepoMock1.setId(3);
        testOutputUserForRepoMock1.setUsername("Oak");
        testOutputUserForRepoMock1.setProfileImageUrl("www.oak-image.com");

        testOutputUserForRepoMock2 = new User();
        testOutputUserForRepoMock2.setId(2);
        testOutputUserForRepoMock2.setUsername("Elm");
        testOutputUserForRepoMock2.setProfileImageUrl("www.elm-image.com");
    }

    private void setupServiceMock(){
//        userServiceMock = mock(UserService.class);
        doReturn(testOutputUserForServiceMock1).when(userServiceMock).findUserByUsername("train");
        doReturn(testOutputUserForServiceMock2).when(userServiceMock).findUserByUsername("plane");
    }

    private void setupRepoMock(){
        userRepo = mock(UserRepo.class);
        doReturn(testOutputUserForRepoMock1).when(userRepo).findByUsername("Oak");
        doReturn(testOutputUserForRepoMock2).when(userRepo).findByUsername("Elm");
    }
}