package grad.javablog.repository;

import grad.javablog.domain.Entry;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Entry entity.
 */
@SuppressWarnings("unused")
public interface EntryRepository extends JpaRepository<Entry,Long> {

    @Query("select entry from Entry entry where entry.user.login = ?#{principal.username}")
    List<Entry> findByUserIsCurrentUser();
    
    

}
