package com.cognizant.commentcrud.repo;

import com.cognizant.commentcrud.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepo extends PagingAndSortingRepository<Comment, Integer> {

    Page<Comment> findAllByPostId(Integer postId, Pageable pageRequest);

}
