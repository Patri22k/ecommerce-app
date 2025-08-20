package io.github.patri22k.paymentservice.service;

import io.github.patri22k.paymentservice.dto.CheckoutResponseDto;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PaymentService {

    public ResponseEntity<CheckoutResponseDto> checkout(String cartId, String userId) {
        // TODO
        return null;
    }

}
