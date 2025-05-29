package com.blacksystem.poultry_system.models.employees;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

import java.sql.Date;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "tipo_trabajador", discriminatorType = DiscriminatorType.STRING)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class  Employee {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name= "id_employee")
Long idEmployee;
    @Column(name="name_employee")
    String nameEmployee;
    @Column(name="last_name_employee")
    String lastName;
    @Column(name="middle_name_employee")
    String middleName;
    @Column(name="birth_date")
    Date birthDate;
    @Column(name="rfc_employee")
    String rfcEmployee;
    @Column(name="email_employee")
    @NaturalId(mutable = true)
    private String emailEmployee;
    @Column(name= "password_employee")
    private String passswordEmployee;
    @Column(name="url_photo_id")
    private String urlPhotoId;
}
