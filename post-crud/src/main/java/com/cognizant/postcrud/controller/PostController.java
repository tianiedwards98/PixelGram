package com.cognizant.postcrud.controller;

import com.cognizant.postcrud.model.Post;
import com.cognizant.postcrud.repository.PostRepo;
import com.cognizant.postcrud.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {

    @Autowired
    private PostService service;

    @Autowired
    PostRepo repo;

    @GetMapping(path ="/posts")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Post> getAllPosts(@RequestParam(name = "pageNumber", defaultValue = "0") Integer pageNo,
                                  @RequestParam(name = "pageSize", defaultValue = "5") Integer pageSize,
                                  @RequestParam(name= "sortBy", defaultValue = "createdOn") String sortBy ) {

            return service.getAll(pageNo, pageSize, sortBy);
            
    }

    @PostMapping(path = "/posts")
    @ResponseStatus(value = HttpStatus.CREATED)
    public Post createPost(@RequestHeader("Authorization") String accessToken, @RequestBody Post post) {
        return service.createPost(post);
    }

}
