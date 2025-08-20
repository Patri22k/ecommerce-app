package io.github.patri22k.paymentservice.dto;

import lombok.*;

@Data
@Builder
public class CheckoutResponseDto {

    private String paymentId;
    private String status;

}
