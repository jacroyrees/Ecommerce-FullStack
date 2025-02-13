package org.example.ecommercesite.service;

import org.example.ecommercesite.model.User;
import org.example.ecommercesite.repo.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static org.example.ecommercesite.model.Role.ADMIN;
import static org.example.ecommercesite.model.Role.USER;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(User user) {
        if (userRepository.existsByUserName(user.getUserName())) {
            return null;
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(user.getEmail().equals("jacroystonrees1@gmail.com") ? ADMIN : USER);

        return userRepository.save(user);
    }

    public User login(String userName, String password) {
        User user = userRepository.findByUserName(userName);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    public List<User> registerMultipleUsers(List<User> users) {
        return users.stream()
                .filter(user -> !userRepository.existsByUserName(user.getUserName()))
                .map(user -> {
                    user.setPassword(passwordEncoder.encode(user.getPassword()));
                    user.setRole(user.getEmail().equals("jacroystonrees1@gmail.com") ? ADMIN : USER);
                    return userRepository.save(user);
                })
                .collect(Collectors.toList());
    }
}