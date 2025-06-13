
package com.blacksystem.poultry_system.repository.poultryplant;

import com.blacksystem.poultry_system.models.poultryplant.Mortality;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MortalityRepository extends CrudRepository<Mortality, Integer> {

}
