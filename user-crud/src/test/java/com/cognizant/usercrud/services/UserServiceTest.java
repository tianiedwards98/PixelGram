package com.cognizant.usercrud.services;

import com.cognizant.usercrud.exceptions.InvalidUsernameException;
import com.cognizant.usercrud.models.User;
import com.cognizant.usercrud.repo.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class UserServiceTest {

    @Autowired
    UserService userService;

    UserRepo userRepoMock;
    UserService userServiceWithMockRepo;

    private User testOutputUserForMock1, testOutputUserForMock2, testOutputUser1, testOutputUser2;

    @BeforeEach
    void setUp() {
        setupTestUsers();
        setupRepoMock();
        userServiceWithMockRepo = new UserService(userRepoMock);
    }

    @Test
    void shouldReturnUserWhenMockRepoIsProvidedValidUsername() {
        String test1 = "train";
        String test2 = "plane";

        User expectedOutputFromTest1 = testOutputUserForMock1;
        User expectedOutputFromTest2 = testOutputUserForMock2;

        User actualOutputFromTest1 = userServiceWithMockRepo.findUserByUsername(test1);
        User actualOutputFromTest2 = userServiceWithMockRepo.findUserByUsername(test2);

        assertEquals(expectedOutputFromTest1, actualOutputFromTest1);
        assertEquals(expectedOutputFromTest2, actualOutputFromTest2);
    }

    @Test
    void shouldThrowInvalidUsernameExceptionWhenMockRepoIsPassedInvalidUsername() {
        String test1 = "apple";
        String test2 = "banana";

        assertThrows(InvalidUsernameException.class, () -> userServiceWithMockRepo.findUserByUsername(test1));
        assertThrows(InvalidUsernameException.class, () -> userServiceWithMockRepo.findUserByUsername(test2));
    }

    @Test
    void shouldReturnUserWhenRealRepoIsProvidedValidUsername() {
        String test1 = "lion";
        String test2 = "elephant";

        User expectedOutputFromTest1 = testOutputUser1;
        User expectedOutputFromTest2 = testOutputUser2;

        User actualOutputFromTest1 = userService.findUserByUsername(test1);
        User actualOutputFromTest2 = userService.findUserByUsername(test2);

        assertEquals(expectedOutputFromTest1, actualOutputFromTest1);
        assertEquals(expectedOutputFromTest2, actualOutputFromTest2);
    }

    @Test
    void shouldThrowInvalidUsernameExceptionWhenRealRepoIsPassedInvalidUsername() {
        String test1 = "apple";
        String test2 = "banana";

        assertThrows(InvalidUsernameException.class, () -> userService.findUserByUsername(test1));
        assertThrows(InvalidUsernameException.class, () -> userService.findUserByUsername(test2));
    }

    private void setupTestUsers(){
        testOutputUserForMock1 = new User();
        testOutputUserForMock1.setId(1);
        testOutputUserForMock1.setUsername("train");
        testOutputUserForMock1.setProfileImageUrl("www.train-image.com");

        testOutputUserForMock2 = new User();
        testOutputUserForMock2.setId(2);
        testOutputUserForMock2.setUsername("plane");
        testOutputUserForMock2.setProfileImageUrl("www.plain-image.com");

        testOutputUser1 = new User();
        testOutputUser1.setId(3);
        testOutputUser1.setUsername("lion");
        testOutputUser1.setProfileImageUrl("www.lion-image.com");

        testOutputUser2 = new User();
        testOutputUser2.setId(2);
        testOutputUser2.setUsername("elephant");
        testOutputUser2.setProfileImageUrl("https://c402277.ssl.cf1.rackcdn.com/photos/14206/images/hero_small/WW187785.jpg?1576774644");
    }

    private void setupRepoMock(){
        userRepoMock = mock(UserRepo.class);
        doReturn(testOutputUserForMock1).when(userRepoMock).findByUsername("train");
        doReturn(testOutputUserForMock2).when(userRepoMock).findByUsername("plane");
    }
}