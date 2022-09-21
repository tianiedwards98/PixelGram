package com.cognizant.commentcrud.service;

import com.cognizant.commentcrud.model.Comment;
import com.cognizant.commentcrud.repo.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {

    private CommentRepo repo;

    @Autowired
    public CommentService(CommentRepo repo) {
        this.repo = repo;
    }

    public Page<Comment> getAllCommentsByPostId(Integer postId, Integer pageNumber, Integer pageSize){
        Pageable pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by("createdOn").descending());
        Page<Comment> pagedResult = repo.findAllByPostId(postId, pageRequest);
//        System.out.println(pagedResult.getContent());
        return pagedResult;
    }

    public Comment createComment(Comment comment){
        LocalDateTime now = LocalDateTime.now();
        comment.setCreatedOn(now);

        return repo.save(comment);
    }

}
