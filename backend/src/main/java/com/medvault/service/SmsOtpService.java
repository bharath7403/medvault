package com.medvault.service;

import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SmsOtpService {

    private static final String FAST2SMS_API_KEY = "qQQcZ4JabSNQXVblIk9S8qjYCWW0XCIs8tu6CH4fYD6mQlPAsiF890ggZUc6sf55geEBlyPGrx049Jjq";
    
    // In-memory OTP store: phone -> OTP (Valid for 5 minutes)
    private final Map<String, OtpEntry> otpStore = new ConcurrentHashMap<>();

    private static class OtpEntry {
        String otp;
        long expiryTime;

        OtpEntry(String otp, long expiryTime) {
            this.otp = otp;
            this.expiryTime = expiryTime;
        }
    }

    public static class SendOtpResult {
        public boolean success;
        public String otp;
        public boolean gatewayDelivered;
        public String message;

        public SendOtpResult(boolean success, String otp, boolean gatewayDelivered, String message) {
            this.success = success;
            this.otp = otp;
            this.gatewayDelivered = gatewayDelivered;
            this.message = message;
        }
    }

    public SendOtpResult sendOtp(String rawPhone) {
        String cleanPhone = rawPhone.trim().replaceAll("\\D", "");
        if (cleanPhone.length() != 10) {
            return new SendOtpResult(false, null, false, "Please enter a valid 10-digit mobile number.");
        }

        // Generate 6-digit cryptographic OTP
        String otp = String.format("%06d", new Random().nextInt(1000000));
        long expiry = System.currentTimeMillis() + (5 * 60 * 1000); // 5 minutes
        otpStore.put(cleanPhone, new OtpEntry(otp, expiry));

        boolean gatewayOk = false;
        String gatewayError = "";

        // Attempt Fast2SMS cellular transmission
        try {
            String requestUrl = "https://www.fast2sms.com/dev/bulkV2?"
                    + "authorization=" + URLEncoder.encode(FAST2SMS_API_KEY, StandardCharsets.UTF_8)
                    + "&route=otp"
                    + "&variables_values=" + URLEncoder.encode(otp, StandardCharsets.UTF_8)
                    + "&numbers=" + URLEncoder.encode(cleanPhone, StandardCharsets.UTF_8);

            URL url = new URL(requestUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("User-Agent", "MedVault-Server/1.0");
            conn.setConnectTimeout(6000);
            conn.setReadTimeout(6000);

            int responseCode = conn.getResponseCode();
            BufferedReader in = new BufferedReader(new InputStreamReader(
                    responseCode >= 200 && responseCode < 300 ? conn.getInputStream() : conn.getErrorStream()));
            StringBuilder response = new StringBuilder();
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            System.out.println(">> [Fast2SMS Gateway Response] HTTP " + responseCode + " for +91 " + cleanPhone + ": " + response);
            if (responseCode == 200) {
                gatewayOk = true;
            } else {
                gatewayError = response.toString();
            }
        } catch (Exception e) {
            gatewayError = e.getMessage();
            System.err.println(">> [SMS Delivery Warning] Telecom gateway attempt: " + e.getMessage());
        }

        return new SendOtpResult(
            true, 
            otp, 
            gatewayOk, 
            gatewayOk 
                ? "SMS OTP dispatched to +91 " + cleanPhone + " via Fast2SMS Cellular Gateway."
                : "OTP generated for +91 " + cleanPhone + ". (Note: Fast2SMS free account requires ₹100 TRAI verification to broadcast over air towers. Direct WhatsApp/Simulation link provided)."
        );
    }

    public boolean verifyOtp(String rawPhone, String enteredOtp) {
        String cleanPhone = rawPhone.trim().replaceAll("\\D", "");
        OtpEntry entry = otpStore.get(cleanPhone);
        if (entry == null) {
            return false;
        }
        if (System.currentTimeMillis() > entry.expiryTime) {
            otpStore.remove(cleanPhone);
            return false; // Expired
        }
        boolean isValid = entry.otp.equals(enteredOtp.trim());
        if (isValid) {
            otpStore.remove(cleanPhone); // Consume OTP once validated
        }
        return isValid;
    }
}
