package com.cognizant.usercrud.controllers;

import com.cognizant.usercrud.exceptions.MissingUsernameException;
import com.cognizant.usercrud.models.User;
import com.cognizant.usercrud.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping
    public User getUserByUsername(@RequestParam(required = false) String username) throws MissingUsernameException{
        if(username == null || username.equals("")){
            throw new MissingUsernameException("Username cannot be blank.");
        }
        return userService.findUserByUsername(username);
    }
}
