package org.ymg.typing.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class TypingResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private int wordsPerMinute;
    private double accuracy;
    private int totalCharacters;
    private int correctCharacters;
    private int wrongCharacters;
    private LocalDateTime testDate;
    private String testDuration;
    private String textContent;
}
