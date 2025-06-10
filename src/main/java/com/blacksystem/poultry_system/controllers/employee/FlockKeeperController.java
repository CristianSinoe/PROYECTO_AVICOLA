/*
 * -----------------------------------
 *  Project: poultry-system
 *  Author: chappyd-0
 *  Date: 5/29/25
 * -----------------------------------
 */
package com.blacksystem.poultry_system.controllers.employee;

import com.blacksystem.poultry_system.models.employees.FlockKeeper;
import com.blacksystem.poultry_system.payload.ResponseGlobal;
import com.blacksystem.poultry_system.payload.employee.FlockKeeperRequest;
import com.blacksystem.poultry_system.service.adminstrator.AdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/flockkeeper")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FlockKeeperController {

    private final AdministratorService administratorService;

    @Autowired
    public FlockKeeperController(AdministratorService administratorService) {
        this.administratorService = administratorService;
    }

    // Crear FlockKeeper
    @PostMapping("/create")
    public ResponseEntity<ResponseGlobal<FlockKeeper>> createFlockKeeper(@RequestBody FlockKeeperRequest request) {
        return administratorService.flockKepeer(request);
    }

    // Actualizar FlockKeeper
    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseGlobal<FlockKeeper>> updateFlockKeeper(
            @PathVariable Long id,
            @RequestBody FlockKeeperRequest request) {
        return administratorService.updateDataFlockKeeper(id, request);
    }

    // Eliminar FlockKeeper
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseGlobal<String>> deleteFlockKeeper(@PathVariable Long id) {
        return administratorService.deleteFlockKeeper(id);
    }

}
