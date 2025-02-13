package org.example.ecommercesite.service;

import org.example.ecommercesite.model.Orders;
import org.example.ecommercesite.repo.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

    // Get all orders
    public List<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }

    // Get order by ID
    public Optional<Orders> getOrderById(Long id) {
        return ordersRepository.findById(id);
    }

    // Create a new order
    public Orders createOrder(Orders order) {
        return ordersRepository.save(order);
    }

    // Update order
    public Optional<Orders> updateOrders(Long id, Orders orders) {
        if (ordersRepository.existsById(id)) {
            orders.setId(id);
            return Optional.of(ordersRepository.save(orders));
        }
        return Optional.empty();
    }

    // Delete order
    public boolean deleteOrder(Long id) {
        if (ordersRepository.existsById(id)) {
            ordersRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
