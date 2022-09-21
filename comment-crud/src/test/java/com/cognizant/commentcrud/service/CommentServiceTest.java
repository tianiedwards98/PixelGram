package com.cognizant.commentcrud.service;

import com.cognizant.commentcrud.model.Comment;
import com.cognizant.commentcrud.repo.CommentRepo;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.*;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class CommentServiceTest {
    @InjectMocks
    private CommentService service;

    @Mock
    private CommentRepo repo;

    @BeforeAll
    public static void setUp() {
    }


    @Test
    public void shouldReturnPageWithFiveCommentsWhenGivenPostIdOf1() {

        Comment comment = new Comment();
        comment.setPostId(1);
        List<Comment> list = new ArrayList<>();
        list.add(comment);
        Page<Comment> commentPage = new PageImpl<>(list);
        
        when(repo.findAllByPostId(1,PageRequest.of(0,5,Sort.by("createdOn").descending()))).thenReturn(commentPage);

        List<Comment> comments = service.getAllCommentsByPostId(1, 0, 5).getContent();

        assertNotNull(comments);

        Page<Comment> emptyComments = service.getAllCommentsByPostId(2, 0, 5);
        assertNull(emptyComments );
    }

    @Test
    public void shouldReturnCreatedCommentOnPostRequest(){

        Comment comment2 = new Comment();
        comment2.setId(1);
        comment2.setPostId(3);

        when(repo.save(comment2)).thenReturn(comment2);

        assertEquals(comment2,service.createComment(comment2));

    }



}
