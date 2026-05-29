package com.loanchecker.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.loanchecker.dto.LoanRequestDTO;
import com.loanchecker.dto.LoanResponseDTO;
import com.loanchecker.entity.User;
import com.loanchecker.repository.UserRepository;
import com.loanchecker.service.LoanService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/loan")
@RequiredArgsConstructor
public class LoanController {

    private final LoanService loanService;
    private final UserRepository userRepository;

    @PostMapping("/apply")
    public ResponseEntity<LoanResponseDTO> applyForLoan(@Valid @RequestBody LoanRequestDTO request) {
        
        // Extract authenticated user's email from the security context
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LoanResponseDTO response = loanService.processLoanApplication(request, user);
        
        return ResponseEntity.ok(response);
    }
}