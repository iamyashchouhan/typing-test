package org.ymg.typing.controller;

import org.springframework.web.bind.annotation.*;
import org.ymg.typing.model.TypingResult;
import org.ymg.typing.service.TypingService;

@RestController
@CrossOrigin(origins = "*")
public class TypingController {

    private final TypingService typingService;

    public TypingController(TypingService typingService) {
        this.typingService = typingService;
    }

    @GetMapping("/api/text")
    public String getRandomText() {
        return typingService.getRandomText();
    }

    @PostMapping("/api/result")
    public TypingResult saveResult(@RequestBody TypingResult result) {
        return typingService.saveResult(result);
    }
}
