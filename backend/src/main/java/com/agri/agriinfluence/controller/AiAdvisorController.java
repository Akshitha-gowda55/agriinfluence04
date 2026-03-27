package com.agri.agriinfluence.controller;

import com.agri.agriinfluence.dto.AiAdvisorResponse;
import com.agri.agriinfluence.service.AiAdvisorService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/ai-advisor")
@CrossOrigin(origins = "*")
public class AiAdvisorController {

    private final AiAdvisorService aiAdvisorService;

    public AiAdvisorController(AiAdvisorService aiAdvisorService) {
        this.aiAdvisorService = aiAdvisorService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public AiAdvisorResponse analyzeImage(@RequestPart("image") MultipartFile image) {
        return aiAdvisorService.analyzeRoseDisease(image.getOriginalFilename());
    }
}