/*
 * -----------------------------------
 *  Project: poultry-system
 *  Author: chappyd-0
 *  Date: 5/29/25
 * -----------------------------------
 */
package com.blacksystem.poultry_system.controllers.employee;

import com.blacksystem.poultry_system.repository.RoleRepository;
import com.blacksystem.poultry_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/flockkeepers")
public class FlockeeperController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;





}
