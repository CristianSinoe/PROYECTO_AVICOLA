package com.blacksystem.poultry_system.models.employees;


import com.blacksystem.poultry_system.models.User;
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
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
    @Column(name="url_photo_id")
    private String urlPhotoId;
}
