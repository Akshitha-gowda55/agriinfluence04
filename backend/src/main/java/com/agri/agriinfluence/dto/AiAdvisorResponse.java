package com.agri.agriinfluence.dto;

import java.util.List;

public class AiAdvisorResponse {

    private String disease;
    private String confidence;
    private String symptoms;
    private String fertilizerSuggestion;
    private String pesticideSuggestion;
    private List<String> recommendedProducts;

    public AiAdvisorResponse() {
    }

    public AiAdvisorResponse(
            String disease,
            String confidence,
            String symptoms,
            String fertilizerSuggestion,
            String pesticideSuggestion,
            List<String> recommendedProducts
    ) {
        this.disease = disease;
        this.confidence = confidence;
        this.symptoms = symptoms;
        this.fertilizerSuggestion = fertilizerSuggestion;
        this.pesticideSuggestion = pesticideSuggestion;
        this.recommendedProducts = recommendedProducts;
    }

    public String getDisease() {
        return disease;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public String getConfidence() {
        return confidence;
    }

    public void setConfidence(String confidence) {
        this.confidence = confidence;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getFertilizerSuggestion() {
        return fertilizerSuggestion;
    }

    public void setFertilizerSuggestion(String fertilizerSuggestion) {
        this.fertilizerSuggestion = fertilizerSuggestion;
    }

    public String getPesticideSuggestion() {
        return pesticideSuggestion;
    }

    public void setPesticideSuggestion(String pesticideSuggestion) {
        this.pesticideSuggestion = pesticideSuggestion;
    }

    public List<String> getRecommendedProducts() {
        return recommendedProducts;
    }

    public void setRecommendedProducts(List<String> recommendedProducts) {
        this.recommendedProducts = recommendedProducts;
    }
}