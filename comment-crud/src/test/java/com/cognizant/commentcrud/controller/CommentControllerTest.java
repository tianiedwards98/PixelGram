package com.cognizant.commentcrud.controller;

//import com.c4_soft.springaddons.security.oauth2.test.mockmvc.MockMvcSupport;
//import com.c4_soft.springaddons.security.oauth2.test.mockmvc.ServletUnitTestingSupport;
import com.cognizant.commentcrud.model.Comment;
import com.cognizant.commentcrud.service.CommentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.keycloak.adapters.springboot.KeycloakSpringBootConfigResolver;
import org.keycloak.adapters.springsecurity.KeycloakSecurityComponents;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.domain.*;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(CommentController.class)
//@ComponentScan(basePackageClasses = { KeycloakSecurityComponents.class, KeycloakSpringBootConfigResolver.class })
@AutoConfigureMockMvc(addFilters = false)
public class CommentControllerTest /*extends ServletUnitTestingSupport*/  {

//    @Autowired
//    private MockMvcSupport mock;
    @Autowired
    private MockMvc mock;

    @Autowired
    private ObjectMapper mapper;

    @MockBean
    private CommentService service;

    private List<Comment> comments = new ArrayList<>();
    private Comment testComment1, testComment2, testComment3;

    @BeforeEach
    public void setUp() {
        testComment1 = new Comment(
                1,
                "giraffe",
                "This is a comment from a giraffe",
                LocalDateTime.of(2021, 4, 17, 0, 0)
        );

        testComment2 = new Comment(
                1,
                "gorilla",
                "This is a comment from a gorilla",
                LocalDateTime.of(2021, 4, 18, 0, 0)
        );

        testComment3 = new Comment(
                1,
                "lion",
                "This is a comment from a lion",
                LocalDateTime.of(2021, 4, 19, 0, 0)
        );

        comments.add(testComment1);
        comments.add(testComment2);
        comments.add(testComment3);
    }

    @Test
    //@WithMockKeycloakAuth
    public void shouldReturnStatusOkWhenAccessingCommentsWhileUnauthorized() throws Exception {
        mock.perform(get("/comments"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    //@WithMockKeycloakAuth("ROLE_default-roles-enablement")
    public void shouldReturnPageOfCommentsAndStatusOkWhenGivenPostId() throws Exception {
        String uri = "/comments?pageSize=5&pageNumber=0&postId=1";
        Pageable pageRequest = PageRequest.of(0, 5, Sort.by("createdOn").descending());
        Page page = new PageImpl(comments, pageRequest, comments.size());
        String response = mapper.writeValueAsString(page);
        doReturn(page).when(this.service).getAllCommentsByPostId(1, 0, 5);

        mock.perform(get(uri))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().json(response));
    }

    @Test
    void shouldReturnCreatedCommentOnPostRequest() throws Exception{
        Comment comment = new Comment();
        comment.setUsername("billy123");
        comment.setPostId(1);
        comment.setBody("This is so awesome");
        comment.setCreatedOn(LocalDateTime.of(2021, Month.MARCH,5,00,00,00));

        String inputJson = mapper.writeValueAsString(comment);

        Comment outputComment = new Comment();
        outputComment.setId(1);
        outputComment.setUsername("billy123");
        outputComment.setPostId(1);
        outputComment.setBody("This is so awesome");
        outputComment.setCreatedOn(LocalDateTime.of(2021, Month.MARCH,5,00,00,00));

        String outputJson = mapper.writeValueAsString(outputComment);

        when(service.createComment(comment)).thenReturn(outputComment);

        this.mock.perform(post("/comments")
            .content(inputJson)
            .contentType(MediaType.APPLICATION_JSON))
            .andDo(print())
            .andExpect(status().isCreated())
            .andExpect(content().json(outputJson));
    }

}
