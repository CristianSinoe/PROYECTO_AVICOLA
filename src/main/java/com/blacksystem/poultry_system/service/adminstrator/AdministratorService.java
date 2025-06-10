/*
 * -----------------------------------
 *  Project: poultry-system
 *  Author: chappyd-0
 *  Date: 6/3/25
 * -----------------------------------
 */
package com.blacksystem.poultry_system.service.adminstrator;

import com.blacksystem.poultry_system.models.ERole;
import com.blacksystem.poultry_system.models.Role;
import com.blacksystem.poultry_system.models.User;
import com.blacksystem.poultry_system.models.employees.FlockKeeper;
import com.blacksystem.poultry_system.models.poultryplant.Zone;
import com.blacksystem.poultry_system.payload.ResponseGlobal;
import com.blacksystem.poultry_system.payload.employee.FlockKeeperRequest;
import com.blacksystem.poultry_system.repository.RoleRepository;
import com.blacksystem.poultry_system.repository.UserRepository;
import com.blacksystem.poultry_system.repository.employee.AdministratorRepository;
import com.blacksystem.poultry_system.repository.employee.FlockKeeperRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class AdministratorService {

    private final AdministratorRepository administratorRepository;
    private final FlockKeeperRepository flockKeeperRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public AdministratorService(AdministratorRepository adminRepo, FlockKeeperRepository flockKeeperRepository, UserRepository userRepo, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.administratorRepository = adminRepo;
        this.flockKeeperRepository = flockKeeperRepository;
        this.userRepository = userRepo;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public ResponseEntity<ResponseGlobal<FlockKeeper>> flockKepeer(FlockKeeperRequest request) {

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));


        Role role = roleRepository.findByName(ERole.ROLE_FLOCKEERPER)
                .orElseThrow(() -> new RuntimeException("Error: Rol no encontrado."));

        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);

        userRepository.save(user);

        // Crear FlockKeeper
        FlockKeeper flockKeeper = new FlockKeeper();
        flockKeeper.setNameEmployee(request.getNameEmployee());
        flockKeeper.setLastName(request.getLastName());
        flockKeeper.setMiddleName(request.getMiddleName());
        flockKeeper.setBirthDate(request.getBirthDate());
        flockKeeper.setRfcEmployee(request.getRfcEmployee());
        flockKeeper.setUrlPhotoId(request.getUrlPhotoId());
        flockKeeper.setUser(user);

        FlockKeeper saved = flockKeeperRepository.save(flockKeeper);

        ResponseGlobal<FlockKeeper> response = ResponseGlobal.created("FlockKeeper creado con éxito", saved);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }





    public ResponseEntity<ResponseGlobal<FlockKeeper>> updateDataFlockKeeper(Long id, FlockKeeperRequest request) {
        Optional<FlockKeeper> optional = flockKeeperRepository.findById(id);
        if (optional.isPresent()) {
            FlockKeeper fk = optional.get();
            fk.setNameEmployee(request.getNameEmployee());
            fk.setLastName(request.getLastName());
            fk.setMiddleName(request.getMiddleName());
            fk.setBirthDate(request.getBirthDate());
            fk.setRfcEmployee(request.getRfcEmployee());
            fk.setUrlPhotoId(request.getUrlPhotoId());
            // No actualizamos el User aquí por seguridad
            FlockKeeper updated = flockKeeperRepository.save(fk);
            return ResponseEntity.ok(
                    ResponseGlobal.success("FlockKeeper actualizado correctamente", updated)
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ResponseGlobal.error("FlockKeeper no encontrado con id " + id, HttpStatus.NOT_FOUND));
    }




    public ResponseEntity<ResponseGlobal<String>> deleteFlockKeeper(Long id) {
        Optional<FlockKeeper> optional = flockKeeperRepository.findById(id);
        if (optional.isPresent()) {
            FlockKeeper fk = optional.get();
            User user = fk.getUser();

            flockKeeperRepository.delete(fk);
            if (user != null) {
                userRepository.delete(user);
            }
            return ResponseEntity.ok(
                    ResponseGlobal.success("FlockKeeper eliminado correctamente", "id eliminado: " + id)
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ResponseGlobal.error("FlockKeeper no encontrado con id " + id, HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<ResponseGlobal<String>> createZone(Zone zonetoRegister) {

    }


}