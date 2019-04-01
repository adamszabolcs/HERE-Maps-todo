package com.codecool.todo.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigInteger;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Todo {

    @GeneratedValue
    @Id
    private Long id;

    private String title;

    private Double latitude;

    private Double longitude;

    @Enumerated(EnumType.STRING)
    private Status status;


}
