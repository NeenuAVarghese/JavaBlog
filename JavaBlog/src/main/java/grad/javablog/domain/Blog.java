package grad.javablog.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Blog.
 */
@Entity
@Table(name = "blog")
public class Blog implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "blog_name")
    private String blogName;

    @Column(name = "blog_handle")
    private String blogHandle;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBlogName() {
        return blogName;
    }

    public Blog blogName(String blogName) {
        this.blogName = blogName;
        return this;
    }

    public void setBlogName(String blogName) {
        this.blogName = blogName;
    }

    public String getBlogHandle() {
        return blogHandle;
    }

    public Blog blogHandle(String blogHandle) {
        this.blogHandle = blogHandle;
        return this;
    }

    public void setBlogHandle(String blogHandle) {
        this.blogHandle = blogHandle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Blog blog = (Blog) o;
        if(blog.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, blog.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Blog{" +
            "id=" + id +
            ", blogName='" + blogName + "'" +
            ", blogHandle='" + blogHandle + "'" +
            '}';
    }
}
