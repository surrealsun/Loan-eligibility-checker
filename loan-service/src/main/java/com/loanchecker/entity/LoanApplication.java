package com.loanchecker.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.loanchecker.enums.ApprovalStatus;
import com.loanchecker.enums.RiskLevel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "loan_applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoanApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double monthlyIncome;

    @Column(nullable = false)
    private Double existingEmi;

    @Column(nullable = false)
    private Double requestedLoanAmount;

    @Column(nullable = false)
    private Integer loanTenureMonths;

    @Column(nullable = false)
    private Double annualInterestRate;

    @Column(nullable = false)
    private Integer creditScore;

    private Double calculatedEmi;
    private Double debtToIncomeRatio;

    @Enumerated(EnumType.STRING)
    private RiskLevel riskLevel;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private ApprovalStatus approvalStatus = ApprovalStatus.PENDING;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}