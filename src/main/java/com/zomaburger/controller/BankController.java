package com.zomaburger.controller;

import com.zomaburger.entity.EthiopianBank;
import com.zomaburger.repository.EthiopianBankRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/banks")
@CrossOrigin(origins = "http://localhost:3000")
public class BankController {

    @Autowired
    private EthiopianBankRepository bankRepository;

    @GetMapping
    public List<EthiopianBank> getAllBanks() {
        return bankRepository.findByActiveTrue();
    }
}