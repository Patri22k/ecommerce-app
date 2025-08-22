package io.github.patri22k.paymentservice.repository;

import io.github.patri22k.paymentservice.model.PaymentModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<PaymentModel, String> {
}
