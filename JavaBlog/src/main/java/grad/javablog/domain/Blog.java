package grad.javablog.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Blog.
 */
@Entity
@Table(name = "blog")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Blog implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "blog_name", nullable = false)
    private String blogName;

    @NotNull
    @Column(name = "blog_handle", nullable = false)
    private String blogHandle;

    @OneToMany(mappedBy = "blog")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Entry> entries = new HashSet<>();

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

    public Set<Entry> getEntries() {
        return entries;
    }

    public Blog entries(Set<Entry> entries) {
        this.entries = entries;
        return this;
    }

    public Blog addEntry(Entry entry) {
        entries.add(entry);
        entry.setBlog(this);
        return this;
    }

    public Blog removeEntry(Entry entry) {
        entries.remove(entry);
        entry.setBlog(null);
        return this;
    }

    public void setEntries(Set<Entry> entries) {
        this.entries = entries;
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
