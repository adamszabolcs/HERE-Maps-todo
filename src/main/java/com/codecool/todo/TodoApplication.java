package com.codecool.todo;

import com.codecool.todo.model.Todo;
import com.codecool.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TodoApplication {

    @Autowired
    TodoRepository repository;

    public static void main(String[] args) {
        SpringApplication.run(TodoApplication.class, args);
    }

    @Bean
    public CommandLineRunner init() {
        return args -> {
            Todo todo = Todo.builder()
                    .title("First")
                    .latitude(47.474742084506396)
                    .longitude(19.03696279731443)
                    .build();
            repository.save(todo);
        };
    }

}
