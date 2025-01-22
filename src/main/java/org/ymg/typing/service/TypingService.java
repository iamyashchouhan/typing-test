package org.ymg.typing.service;

import org.springframework.stereotype.Service;
import org.ymg.typing.model.TypingResult;
import org.ymg.typing.repository.TypingResultRepository;
import java.time.LocalDateTime;
import java.util.Random;

@Service
public class TypingService {
    
    private final TypingResultRepository typingResultRepository;
    private final String[] sampleTexts = {
        "The quick brown fox jumps over the lazy dog.",
        "Pack my box with five dozen liquor jugs.",
        "How vexingly quick daft zebras jump!",
        "The five boxing wizards jump quickly.",
        "Sphinx of black quartz, judge my vow."
    };
    private final Random random = new Random();

    public TypingService(TypingResultRepository typingResultRepository) {
        this.typingResultRepository = typingResultRepository;
    }
    
    public String getRandomText() {
        return sampleTexts[random.nextInt(sampleTexts.length)];
    }
    
    public TypingResult saveResult(TypingResult result) {
        result.setTestDate(LocalDateTime.now());
        return typingResultRepository.save(result);
    }
}
