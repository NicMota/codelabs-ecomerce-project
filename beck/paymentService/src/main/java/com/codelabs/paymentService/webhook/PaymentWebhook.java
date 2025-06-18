package com.codelabs.paymentService.webhook;

import com.codelabs.paymentService.dto.ProductDTO;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment/webhook")
public class PaymentWebhook {

    @Value("${stripe.secretWebhook}")
    private String endpointSecret;

    @Autowired
    private KafkaTemplate<String,Object> kafkaTemplate;

    @PostMapping
    public ResponseEntity<String> handleStripeEvent(@RequestBody String payload,
                                                    @RequestHeader("Stripe-Signature") String sigHeader)
    {
        Event event;
        try{
            event = Webhook.constructEvent(
                    payload,sigHeader,endpointSecret
            );

        } catch (SignatureVerificationException e) {
            return ResponseEntity.status(400).body("");
        }

        if("checkout.session.completed".equals(event.getType()))
        {
           Session session = (Session) event.getDataObjectDeserializer().getObject().get();

           String sessionId = session.getId();
           String customerEmail = session.getCustomerEmail();
           String id = session.getMetadata().get("productId");
           Long quantity = Long.parseLong(session.getMetadata().get("productQuantity"));

           ProductDTO data = new ProductDTO(id,quantity);
           //String message = "Pagamento aprovado para cliente: " + customerEmail + ", sessão: " + sessionId;
           System.out.println("-----------chegou aqui-----------------");

           kafkaTemplate.send("payment-events", data);
        }
        return ResponseEntity.ok("");
    }
}
