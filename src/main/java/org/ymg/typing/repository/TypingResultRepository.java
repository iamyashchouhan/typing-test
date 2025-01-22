package org.ymg.typing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ymg.typing.model.TypingResult;

public interface TypingResultRepository extends JpaRepository<TypingResult, Long> {
    // Custom queries can be added here if needed
}
