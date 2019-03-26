package com.codecool.todo.controller;

import com.codecool.todo.model.Todo;
import com.codecool.todo.repository.TodoRepository;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public String getList() throws JSONException {
        List<Todo> todos = todoRepository.findAll();
        JSONArray arr = new JSONArray();
        for (Todo todo : todos) {
            JSONObject jo = new JSONObject();
            jo.put("title", todo.getTitle());
            jo.put("latitude", todo.getLatitude());
            jo.put("longitude", todo.getLongitude());
            arr.put(jo);
        }
        return arr.toString(2);

    }

}
