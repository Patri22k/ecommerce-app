package io.github.patri22k.paymentservice.controller;

import io.github.patri22k.paymentservice.dto.CheckoutRequestDto;
import io.github.patri22k.paymentservice.dto.CheckoutResponseDto;
import io.github.patri22k.paymentservice.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/services/payment")
@RestController
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/checkout")
    public ResponseEntity<CheckoutResponseDto> checkout(@RequestBody CheckoutRequestDto request) {
        return paymentService.checkout(request.getCartId(), request.getUserId());
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Success");
    }

}
