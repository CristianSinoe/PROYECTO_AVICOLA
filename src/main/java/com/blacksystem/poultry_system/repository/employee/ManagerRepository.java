
package com.blacksystem.poultry_system.repository.employee;

import com.blacksystem.poultry_system.models.employees.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ManagerRepository extends JpaRepository<Manager, Long> {
    @Override
    Optional<Manager> findById(Long aLong);
}
