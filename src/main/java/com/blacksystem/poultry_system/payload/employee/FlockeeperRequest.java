/*
 * -----------------------------------
 *  Project: poultry-system
 *  Author: chappyd-0
 *  Date: 5/29/25
 * -----------------------------------
 */
package com.blacksystem.poultry_system.payload.employee;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class FlockeeperRequest {
    // ——— Campos de login ———
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank @Size(max = 50) @Email
    private String email;

    @NotBlank @Size(min = 6, max = 40)
    private String password;

    // ——— Campos de Employee ———
    @NotBlank
    private String nameEmployee;

    @NotBlank
    private String lastName;

    private String middleName;

    @NotNull
    private LocalDate birthDate;

    @NotBlank
    private String rfcEmployee;

    @NotBlank @Size(max = 50) @Email
    private String emailEmployee;

    @NotBlank @Size(min = 6, max = 40)
    private String employeePassword;

    private String urlPhotoId;

    // getters and setters

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNameEmployee() {
        return nameEmployee;
    }

    public void setNameEmployee(String nameEmployee) {
        this.nameEmployee = nameEmployee;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getRfcEmployee() {
        return rfcEmployee;
    }

    public void setRfcEmployee(String rfcEmployee) {
        this.rfcEmployee = rfcEmployee;
    }

    public String getEmailEmployee() {
        return emailEmployee;
    }

    public void setEmailEmployee(String emailEmployee) {
        this.emailEmployee = emailEmployee;
    }

    public String getEmployeePassword() {
        return employeePassword;
    }

    public void setEmployeePassword(String employeePassword) {
        this.employeePassword = employeePassword;
    }

    public String getUrlPhotoId() {
        return urlPhotoId;
    }

    public void setUrlPhotoId(String urlPhotoId) {
        this.urlPhotoId = urlPhotoId;
    }
}
