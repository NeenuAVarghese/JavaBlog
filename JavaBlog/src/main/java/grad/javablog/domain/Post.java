package grad.javablog.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Post.
 */
@Entity
@Table(name = "post")
public class Post implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "post_name")
    private String postName;

    @Lob
    @Column(name = "post_content")
    private String postContent;

    @Column(name = "vote_count")
    private Integer voteCount;

    @ManyToOne
    private User user;

    @ManyToOne
    private Blog blog;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPostName() {
        return postName;
    }

    public Post postName(String postName) {
        this.postName = postName;
        return this;
    }

    public void setPostName(String postName) {
        this.postName = postName;
    }

    public String getPostContent() {
        return postContent;
    }

    public Post postContent(String postContent) {
        this.postContent = postContent;
        return this;
    }

    public void setPostContent(String postContent) {
        this.postContent = postContent;
    }

    public Integer getVoteCount() {
        return voteCount;
    }

    public Post voteCount(Integer voteCount) {
        this.voteCount = voteCount;
        return this;
    }

    public void setVoteCount(Integer voteCount) {
        this.voteCount = voteCount;
    }

    public User getUser() {
        return user;
    }

    public Post user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Blog getBlog() {
        return blog;
    }

    public Post blog(Blog blog) {
        this.blog = blog;
        return this;
    }

    public void setBlog(Blog blog) {
        this.blog = blog;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Post post = (Post) o;
        if(post.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, post.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Post{" +
            "id=" + id +
            ", postName='" + postName + "'" +
            ", postContent='" + postContent + "'" +
            ", voteCount='" + voteCount + "'" +
            '}';
    }
}
