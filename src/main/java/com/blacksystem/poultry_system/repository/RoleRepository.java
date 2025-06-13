
package com.blacksystem.poultry_system.repository;

import com.blacksystem.poultry_system.models.ERole;
import com.blacksystem.poultry_system.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}