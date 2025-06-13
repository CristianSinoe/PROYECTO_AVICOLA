
package com.blacksystem.poultry_system.payload.poultryplant;


import com.blacksystem.poultry_system.models.employees.FlockKeeper;
import com.blacksystem.poultry_system.models.poultryplant.Zone;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PoultryHouseRequest {
    @NotNull
    private Zone zone;
    @NotNull
    private FlockKeeper flockKeeper;
    @NotNull
    private String poultryHouseName;
    @NotNull
    private int femaleCount;
    @NotNull
    private int  maleCount;
}
