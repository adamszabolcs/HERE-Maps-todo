package com.codecool.todo.controller;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
@CrossOrigin
public class WebController {

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

    @GetMapping("/hello")
    public String hello() {
        return "Hello!!!!";
    }

}
