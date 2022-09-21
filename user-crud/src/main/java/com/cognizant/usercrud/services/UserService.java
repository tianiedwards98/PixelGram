package com.cognizant.usercrud.services;

import com.cognizant.usercrud.exceptions.InvalidUsernameException;
import com.cognizant.usercrud.models.User;
import com.cognizant.usercrud.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserService {

    UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo){
        this.userRepo = userRepo;
    }

    @Transactional
    public User findUserByUsername(String username){
        User returnVal = userRepo.findByUsername(username);
        if(returnVal == null){
            throw new InvalidUsernameException(username + " is an invalid username.");
        }
        return returnVal;
    }
}
