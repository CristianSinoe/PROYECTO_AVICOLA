
package com.blacksystem.poultry_system.repository.poultryplant;

import com.blacksystem.poultry_system.models.poultryplant.PoultryHouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoultryHouseRepository extends JpaRepository<PoultryHouse, Long> {

    void deleteReferenceByIdPoultry(Long aLong);
}
