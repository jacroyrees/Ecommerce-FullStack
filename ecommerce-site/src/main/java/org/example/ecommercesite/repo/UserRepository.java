package org.example.ecommercesite.repo;

import org.example.ecommercesite.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find a user by their username
    @Query("SELECT u FROM User u WHERE u.userName = ?1")
    User findByUserName(String userName);

    // Custom SQL to find a user by email
    @Query(value = "SELECT * FROM user WHERE email = ?1", nativeQuery = true)
    User findByEmail(String email);

    boolean existsByUserName(String userName);

}
