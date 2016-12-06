package grad.javablog.web.rest;

import grad.javablog.JavaBlogApp;

import grad.javablog.domain.Post;
import grad.javablog.repository.PostRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PostResource REST controller.
 *
 * @see PostResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JavaBlogApp.class)
public class PostResourceIntTest {

    private static final String DEFAULT_POST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_POST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_POST_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_POST_CONTENT = "BBBBBBBBBB";

    private static final Integer DEFAULT_VOTE_COUNT = 1;
    private static final Integer UPDATED_VOTE_COUNT = 2;

    @Inject
    private PostRepository postRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restPostMockMvc;

    private Post post;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        PostResource postResource = new PostResource();
        ReflectionTestUtils.setField(postResource, "postRepository", postRepository);
        this.restPostMockMvc = MockMvcBuilders.standaloneSetup(postResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Post createEntity(EntityManager em) {
        Post post = new Post()
                .postName(DEFAULT_POST_NAME)
                .postContent(DEFAULT_POST_CONTENT)
                .voteCount(DEFAULT_VOTE_COUNT);
        return post;
    }

    @Before
    public void initTest() {
        post = createEntity(em);
    }


    @Test
    @Transactional
    public void getAllPosts() throws Exception {
        // Initialize the database
        postRepository.saveAndFlush(post);

        // Get all the posts
        restPostMockMvc.perform(get("/api/posts?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(post.getId().intValue())))
                .andExpect(jsonPath("$.[*].postName").value(hasItem(DEFAULT_POST_NAME.toString())))
                .andExpect(jsonPath("$.[*].postContent").value(hasItem(DEFAULT_POST_CONTENT.toString())))
                .andExpect(jsonPath("$.[*].voteCount").value(hasItem(DEFAULT_VOTE_COUNT)));
    }

    @Test
    @Transactional
    public void getPost() throws Exception {
        // Initialize the database
        postRepository.saveAndFlush(post);

        // Get the post
        restPostMockMvc.perform(get("/api/posts/{id}", post.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(post.getId().intValue()))
            .andExpect(jsonPath("$.postName").value(DEFAULT_POST_NAME.toString()))
            .andExpect(jsonPath("$.postContent").value(DEFAULT_POST_CONTENT.toString()))
            .andExpect(jsonPath("$.voteCount").value(DEFAULT_VOTE_COUNT));
    }

    @Test
    @Transactional
    public void getNonExistingPost() throws Exception {
        // Get the post
        restPostMockMvc.perform(get("/api/posts/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }


    @Test
    @Transactional
    public void deletePost() throws Exception {
        // Initialize the database
        postRepository.saveAndFlush(post);
        int databaseSizeBeforeDelete = postRepository.findAll().size();

        // Get the post
        restPostMockMvc.perform(delete("/api/posts/{id}", post.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Post> posts = postRepository.findAll();
        assertThat(posts).hasSize(databaseSizeBeforeDelete - 1);
    }
}
