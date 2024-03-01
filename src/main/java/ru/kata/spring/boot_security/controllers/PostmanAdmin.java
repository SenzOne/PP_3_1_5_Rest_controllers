package ru.kata.spring.boot_security.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.models.Person;
import ru.kata.spring.boot_security.services.AdminService;

import java.util.List;


@RestController
@RequestMapping("/api")
public class PostmanAdmin {

    private final AdminService adminService;

    public PostmanAdmin(AdminService adminService) {
        this.adminService = adminService;
    }


    @GetMapping("/users")
    public List<Person> getAllUsers() {
        return adminService.getAllUsers();
    }


    @GetMapping("/users/{id}")
    public Person getPerson(@PathVariable("id") Long id) {
        System.out.println(adminService.findOneById(id));
        return adminService.findOneById(id);
    }



    @PostMapping("/users")
    public ResponseEntity<HttpStatus> addPerson(@RequestBody Person person) {
        System.out.println(person);
        return ResponseEntity.ok(HttpStatus.OK);
    }


    @PutMapping("/users/{id}")
    public ResponseEntity<HttpStatus> update(@PathVariable Long id, @RequestBody Person updatedPerson) {
        // Ваш код для обновления пользователя с заданным id
        System.out.println(updatedPerson);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable Long id, @RequestBody Person updatedPerson) {
        // Ваш код для обновления пользователя с заданным id
        System.out.println(updatedPerson);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
