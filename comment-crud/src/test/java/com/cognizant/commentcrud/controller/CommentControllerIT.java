package com.cognizant.commentcrud.controller;

import com.cognizant.commentcrud.model.Comment;
import com.cognizant.commentcrud.repo.CommentRepo;
import com.cognizant.commentcrud.service.CommentService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.*;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class CommentControllerIT {

    @MockBean
    private CommentRepo repo;
    private CommentService service;
    private CommentController controller;

    private Comment testComment1, testComment2, testComment3, testComment4, testComment5, testComment6;
    private List<Comment> commentList = new ArrayList<>();
    private Pageable commentPageRequest;
    private Page<Comment> commentPage;

    private List<Comment> emptyCommentList = new ArrayList<>();
    private Page<Comment> emptyCommentPage;

    @BeforeAll
    public void setUp() {
        setUpTestComments();
        setUpCommentRepoMock();
        service = new CommentService(repo);
        controller = new CommentController(service);
    }

    @Test
    public void shouldReturnPageWithFiveCommentsWhenRepoFindsMoreThanFiveCommentsIT() {
        Page<Comment> expectedFullPage = commentPage;
        Page<Comment> expectedEmptyPage = commentPage;

        Page<Comment> actualFullPage = controller.getAllCommentsByPostId(1, 1, 5);
        Page<Comment> actualEmptyPage = controller.getAllCommentsByPostId(2, 1, 5);

        assertEquals(expectedFullPage, actualFullPage);
        assertEquals(expectedEmptyPage, actualEmptyPage);
    }

    private void setUpTestComments() {
        testComment1 = new Comment(
                1,
                "gorilla",
                "This is a comment from a gorilla",
                LocalDateTime.of(2021, 05, 03, 3, 6)
        );
        testComment2 = new Comment(
                1,
                "giraffe",
                "This is a comment from a giraffe",
                LocalDateTime.of(2021, 05, 03, 3, 7)
        );
        testComment3 = new Comment(
                1,
                "lion",
                "This is a comment from a lion",
                LocalDateTime.of(2021, 05, 03, 3, 8)
        );
        testComment4 = new Comment(
                1,
                "squid",
                "This is a comment from a squid",
                LocalDateTime.of(2021, 05, 03, 3, 9)
        );
        testComment5 = new Comment(
                1,
                "godzilla",
                "This is a comment from a godzilla",
                LocalDateTime.of(2021, 05, 03, 3, 10)
        );
        testComment6 = new Comment(
                1,
                "trex",
                "This is a comment from a t-rex",
                LocalDateTime.of(2021, 05, 03, 3, 11)
        );

        commentList.add(testComment1);
        commentList.add(testComment2);
        commentList.add(testComment3);
        commentList.add(testComment4);
        commentList.add(testComment5);
        commentList.add(testComment6);

        commentPageRequest = PageRequest.of(1, 5, Sort.by("createdOn").descending());
        commentPage = new PageImpl(commentList, commentPageRequest, commentList.size());
        emptyCommentPage = new PageImpl(emptyCommentList, commentPageRequest, commentList.size());
    }

    private void setUpCommentRepoMock() {
        when(repo.findAllByPostId(1, commentPageRequest)).thenReturn(commentPage);
        when(repo.findAllByPostId(2, commentPageRequest)).thenReturn(commentPage);
    }

}
