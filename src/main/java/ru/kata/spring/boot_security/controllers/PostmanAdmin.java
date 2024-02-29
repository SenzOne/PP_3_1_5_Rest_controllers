package ru.kata.spring.boot_security.controllers;

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


    @GetMapping("/sayHello")
    public String sayHello() {
        return "hello world";
    }


    @GetMapping("/allUsers")
    public List<Person> getAllUsers() {
        return adminService.getAllUsers();
    }


    @GetMapping("/{id}}")
    public Person getPerson(@PathVariable("id") Long id) {
        return  adminService.findOneById(id);
    }

}
