/*
 * -----------------------------------
 *  Project: poultry-system
 *  Author: chappyd-0
 *  Date: 6/3/25
 * -----------------------------------
 */
package com.blacksystem.poultry_system.service.adminstrator;

import com.blacksystem.poultry_system.models.employees.Administrator;
import com.blacksystem.poultry_system.repository.employee.AdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdministratorService {

    private final AdministratorRepository adminRepo;

    public AdministratorService(AdministratorRepository adminRepo) {
        this.adminRepo = adminRepo;
    }
    public Administrator registerEmployee(Administrator admin) {
        return adminRepo.save(admin);
    }


    public Administrator updateDataFlcokkepeer(Long id, Administrator adminDetails) {
        Administrator admin = adminRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin no encontrado"));

        admin.setNameEmployee(adminDetails.getNameEmployee());

        return adminRepo.save(admin);
    }

    public void borrar(Long id) {
        adminRepo.deleteById(id);
    }
}