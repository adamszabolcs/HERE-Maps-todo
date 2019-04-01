package com.codecool.todo.controller;

import com.codecool.todo.model.Todo;
import com.codecool.todo.repository.TodoRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@CrossOrigin
public class WebController {

    @Autowired
    TodoRepository todoRepository;

    @Value("${app.id}")
    private String appId;

    @Value("${app.code}")
    private String appCode;

    @GetMapping("/map")
    public Map<String, String> addAPIKey() {
        Map<String, String> jsonString = new HashMap<>();
        jsonString.put("hereMapsAppId", appId);
        jsonString.put("hereMapsAppCode", appCode);
        return jsonString;
    }

    @GetMapping("/list")
    public List<Todo> getList() {
        List<Todo> todos = todoRepository.findAll();
        return todos;
    }

    @PostMapping(value="/todo", headers = "Accept=application/json")
    public ResponseEntity<?> saveTodo(@RequestBody String data) {
        ObjectMapper mapper = new ObjectMapper();
        Double latitude = 0.0;
        Double longitude = 0.0;
        String title = "";
        try {
            JsonNode dataTree = mapper.readTree(data);
            latitude = mapper.treeToValue(dataTree.get("lat"), Double.class);
            longitude = mapper.treeToValue(dataTree.get("lng"), Double.class);
            title = mapper.treeToValue(dataTree.get("title"), String.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        Todo todo = Todo.builder()
                .title(title)
                .latitude(latitude)
                .longitude(longitude)
                .build();
        todoRepository.save(todo);
        log.info("todo saved!");
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
