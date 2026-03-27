package com.agri.agriinfluence.service;

import com.agri.agriinfluence.dto.AiAdvisorResponse;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class AiAdvisorService {

    public AiAdvisorResponse analyzeRoseDisease(String fileName) {

        String lowerName = fileName.toLowerCase();

        if (lowerName.contains("blackspot")) {
            return new AiAdvisorResponse(
                    "Black Spot",
                    "92%",
                    "Dark black spots on leaves and yellowing around edges.",
                    "Use balanced rose fertilizer with potassium support.",
                    "Apply fungicide suitable for black spot control.",
                    Arrays.asList("Rose Fertilizer", "Leaf Care Spray", "Fungicide")
            );
        }

        if (lowerName.contains("powdery")) {
            return new AiAdvisorResponse(
                    "Powdery Mildew",
                    "89%",
                    "White powder-like coating on rose leaves and stems.",
                    "Use low-nitrogen balanced fertilizer.",
                    "Apply sulfur-based or mildew control spray.",
                    Arrays.asList("Rose Nutrient Mix", "Mildew Spray", "Organic Rose Care")
            );
        }

        return new AiAdvisorResponse(
                "Possible Leaf Infection",
                "78%",
                "Visible stress signs detected on rose leaves.",
                "Apply balanced fertilizer for rose recovery.",
                "Use preventive pesticide/fungicide after inspection.",
                Arrays.asList("Rose Fertilizer", "Plant Tonic", "Protective Spray")
        );
    }
}