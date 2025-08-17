package com.amigoscode;

import com.amigoscode.s3.S3Buckets;
import com.amigoscode.s3.S3Service;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import software.amazon.awssdk.services.s3.S3Client;
import org.mockito.Mockito;

@TestConfiguration
public class TestConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Primary
    public S3Buckets s3Buckets() {
        S3Buckets buckets = new S3Buckets();
        buckets.setCustomer("test-bucket"); // Dummy value for tests
        return buckets;
    }

    @Bean
    @Primary
    public S3Service s3Service() {
        // Provide a mock S3Client for tests
        S3Client mockClient = Mockito.mock(S3Client.class);
        return new S3Service(mockClient);
    }
}
