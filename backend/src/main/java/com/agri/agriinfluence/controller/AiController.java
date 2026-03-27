package com.agri.agriinfluence.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class AiController {

    @PostMapping(value = "/predict", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> predictDisease(@RequestParam("file") MultipartFile file) {
        File tempFile = null;

        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body("{\"error\":\"No file uploaded\"}");
            }

            String originalName = file.getOriginalFilename();
            String suffix = ".jpg";

            if (originalName != null && originalName.contains(".")) {
                suffix = originalName.substring(originalName.lastIndexOf("."));
            }

            tempFile = File.createTempFile("upload_", suffix);
            file.transferTo(tempFile);

            ProcessBuilder processBuilder = new ProcessBuilder(
                    "python",
                    "predict.py",
                    tempFile.getAbsolutePath()
            );

            processBuilder.directory(
                    new File("C:\\Users\\Hp\\Downloads\\AgriInfluence-main\\AgriInfluence-main\\ai-service")
            );

            Process process = processBuilder.start();

            BufferedReader stdOut = new BufferedReader(
                    new InputStreamReader(process.getInputStream())
            );
            BufferedReader stdErr = new BufferedReader(
                    new InputStreamReader(process.getErrorStream())
            );

            StringBuilder output = new StringBuilder();
            StringBuilder errorOutput = new StringBuilder();

            String line;
            while ((line = stdOut.readLine()) != null) {
                output.append(line);
            }

            while ((line = stdErr.readLine()) != null) {
                errorOutput.append(line).append(" ");
            }

            int exitCode = process.waitFor();

            if (tempFile.exists()) {
                tempFile.delete();
            }

            if (exitCode != 0) {
                return ResponseEntity.internalServerError()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body("{\"error\":\"Python prediction failed\",\"details\":\""
                                + errorOutput.toString().replace("\"", "'") + "\"}");
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(output.toString());

        } catch (Exception e) {
            if (tempFile != null && tempFile.exists()) {
                tempFile.delete();
            }

            return ResponseEntity.internalServerError()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("{\"error\":\"Backend exception\",\"details\":\""
                            + e.getMessage().replace("\"", "'") + "\"}");
        }
    }
}