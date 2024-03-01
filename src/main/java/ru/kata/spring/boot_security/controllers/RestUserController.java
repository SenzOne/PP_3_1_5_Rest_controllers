package ru.kata.spring.boot_security.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.models.Person;
import ru.kata.spring.boot_security.services.PeopleService;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
public class RestUserController {

    private final PeopleService peopleService;

    public RestUserController(PeopleService peopleService) {
        this.peopleService = peopleService;
    }


    @GetMapping("/showAccount")
    public ResponseEntity<Person> showUserAccount(Principal principal) {
        System.out.println();
        Person person = peopleService.findUserByEmail(principal.getName()).get(); //TODO: обработать искл
        System.out.println();
        return new ResponseEntity<>(person, HttpStatus.OK);
    }
}