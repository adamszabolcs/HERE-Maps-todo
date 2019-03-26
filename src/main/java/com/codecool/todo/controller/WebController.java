package com.codecool.todo.controller;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Controller
public class WebController {

    @Value("${app.id}")
    private String appId;

    @Value("${app.code}")
    private String appCode;

    @GetMapping("/api/map")
    public Map<String, String> addAPIKey() throws IOException {
        Map<String, String> jsonString = new HashMap<>();
        jsonString.put("hereMapsAppId", appId);
        jsonString.put("hereMapsAppCode", appCode);
        return jsonString;
    }

}
