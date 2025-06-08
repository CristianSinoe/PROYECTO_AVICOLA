/*
 * -----------------------------------
 *  Project: poultry-system
 *  Author: chappyd-0
 *  Date: 6/2/25
 * -----------------------------------
 */
package com.blacksystem.poultry_system.service.adminstrator;

import com.blacksystem.poultry_system.models.employees.FlockKeeper;
import com.blacksystem.poultry_system.repository.employee.FlockeeperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FlockKeeperManageService {

    private final FlockeeperRepository flockeeperRepository;

    public FlockKeeperManageService(FlockeeperRepository flockeeperRepository) {
        this.flockeeperRepository = flockeeperRepository;
    }
    public String registerFlockKeeper(FlockKeeper flockKeeper) {

        flockeeperRepository.save(flockKeeper);
        return "OK";
    }

    public String updateFlckkeeper(FlockKeeper flockKeeper) {
        Long idFlockkeeper = flockKeeper.getIdEmployee();
        FlockKeeper updateFlokkeeper = flockeeperRepository.findById(idFlockkeeper).get();
        updateFlokkeeper.setNameEmployee(flockKeeper.getNameEmployee());
        updateFlokkeeper.setLastName(flockKeeper.getLastName());
        updateFlokkeeper.setMiddleName(flockKeeper.getMiddleName());
        updateFlokkeeper.setBirthDate(flockKeeper.getBirthDate());
        updateFlokkeeper.setBirthDate(updateFlokkeeper.getBirthDate());
        updateFlokkeeper.setRfcEmployee(flockKeeper.getRfcEmployee());
        updateFlokkeeper.setUser(flockKeeper.getUser());
        updateFlokkeeper.setUrlPhotoId(flockKeeper.getUrlPhotoId());
        return "Success";
    }

    public String deleteFlockKeeper(Long idFlockkeeper) {
        flockeeperRepository.deleteById(idFlockkeeper);
        return "Success";
    }
}
