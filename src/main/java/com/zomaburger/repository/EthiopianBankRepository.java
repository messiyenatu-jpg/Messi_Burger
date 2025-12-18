package com.zomaburger.repository;

import com.zomaburger.entity.EthiopianBank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EthiopianBankRepository extends JpaRepository<EthiopianBank, Long> {
    List<EthiopianBank> findByActiveTrue();
    Optional<EthiopianBank> findByBankCode(String bankCode);
}