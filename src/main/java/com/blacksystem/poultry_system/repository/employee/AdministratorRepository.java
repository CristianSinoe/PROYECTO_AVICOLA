    
    package com.blacksystem.poultry_system.repository.employee;

    import com.blacksystem.poultry_system.models.employees.Administrator;
    import org.springframework.data.jpa.repository.JpaRepository;

    import java.util.Optional;

    public interface AdministratorRepository extends JpaRepository <Administrator, Long>{

        @Override
        Optional<Administrator> findById(Long aLong);
    }
