package com.agri.agriinfluence.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;

    @PostConstruct
    public void initTwilio() {
        Twilio.init(accountSid, authToken);
    }

    public void sendOtp(String phone, String otp) {
        String formattedPhone = formatPhone(phone);

        String body = "Your AgriInfluence delivery OTP is: " + otp + ". Valid for 10 minutes.";

        Message message = Message.creator(
                new PhoneNumber(formattedPhone),
                new PhoneNumber(twilioPhoneNumber),
                body
        ).create();

        System.out.println("Twilio SMS sent. SID: " + message.getSid());
    }

    private String formatPhone(String phone) {
        if (phone == null) {
            throw new IllegalArgumentException("Phone number is required");
        }

        String cleaned = phone.replaceAll("[^\\d+]", "");

        if (cleaned.startsWith("+")) {
            return cleaned;
        }

        // India default example
        if (cleaned.length() == 10) {
            return "+91" + cleaned;
        }

        throw new IllegalArgumentException("Phone number must be in E.164 format or a valid 10-digit Indian number");
    }
}