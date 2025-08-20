package io.github.patri22k.paymentservice.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CheckoutRequestDto {

    private String userId;
    private String cartId;

}
