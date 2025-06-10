/*
 * -----------------------------------
 *  Project: poultry-system
 *  Author: chappyd-0
 *  Date: 6/10/25
 * -----------------------------------
 */
package com.blacksystem.poultry_system.service.poultryplant;

import com.blacksystem.poultry_system.models.poultryplant.Zone;
import com.blacksystem.poultry_system.repository.poultryplant.ZoneRepository;
import com.blacksystem.poultry_system.service.MessageService;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class ZoneService {
    private final MessageSource messageSource;
    private final ZoneRepository zoneRepository;
    private final MessageService messageService;

    public ZoneService(ZoneRepository zoneRepository, MessageSource messageSource, MessageService messageService) {
        this.messageSource = messageSource;
        this.zoneRepository = zoneRepository;
        this.messageService = messageService;
    }

    public ArrayList<Zone> getAllZones() {
        return zoneRepository.findAll();
    }

    public ResponseEntity<String> createZone(Zone zone) {
        try {
            zoneRepository.save(zone);
            String mensaje = messageService.get("response.confirmatation.creation.zone");

            return ResponseEntity.ok(mensaje);
        } catch (Exception e) {
            String mensaje = messageService.get("response.error.creation.zone");
            return ResponseEntity.badRequest().body(mensaje);
        }
    }
    public ResponseEntity<String> updateZone(Zone zone) {
        try {
            zoneRepository.save(zone);
            String mensaje = messageService.get("response.confirmatation.update.zone");

            return ResponseEntity.ok(mensaje);
        } catch (Exception e) {
            String mensaje = messageService.get("response.error.update.zone");
            return ResponseEntity.badRequest().body(mensaje);
        }
    }

    public ResponseEntity<String> deleteZone(Integer id) {
        try {
            zoneRepository.deleteById(id);
            String mensaje = messageService.get("response.confirmatation.delete.zone");

            return ResponseEntity.ok(mensaje);
        } catch (Exception e) {
            String mensaje = messageService.get("response.error.delete.zone");
            return ResponseEntity.badRequest().body(mensaje);
        }
    }

    public Zone getZoneById(Integer id) {
        return zoneRepository.findById(id).orElse(null);
    }

}
