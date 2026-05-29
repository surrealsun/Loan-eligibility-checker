package com.loanchecker.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.loanchecker.dto.LoanRequestDTO;
import com.loanchecker.dto.LoanResponseDTO;
import com.loanchecker.entity.LoanApplication;
import com.loanchecker.entity.User;
import com.loanchecker.enums.ApprovalStatus;
import com.loanchecker.enums.RiskLevel;
import com.loanchecker.repository.LoanRepository;
import com.loanchecker.util.EmiCalculatorUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoanService {

    private final LoanRepository loanRepository;

    @Transactional
    public LoanResponseDTO processLoanApplication(LoanRequestDTO request, User user) {
        
        // 1. Calculate EMI
        double emi = EmiCalculatorUtil.calculateEMI(
                request.getRequestedLoanAmount(),
                request.getAnnualInterestRate(),
                request.getLoanTenureMonths()
        );

        // 2. Calculate Debt-to-Income (DTI) Ratio
        double totalMonthlyDebt = request.getExistingEmi() + emi;
        double dti = (totalMonthlyDebt / request.getMonthlyIncome()) * 100;

        // 3. Classify Risk
        RiskLevel riskLevel = classifyRisk(dti);

        // 4. Determine Approval Status
        ApprovalStatus status = determineApproval(request.getCreditScore(), dti);

        // 5. Build and Save the Entity
        LoanApplication application = LoanApplication.builder()
                .monthlyIncome(request.getMonthlyIncome())
                .existingEmi(request.getExistingEmi())
                .requestedLoanAmount(request.getRequestedLoanAmount())
                .loanTenureMonths(request.getLoanTenureMonths())
                .annualInterestRate(request.getAnnualInterestRate())
                .creditScore(request.getCreditScore())
                .calculatedEmi(emi)
                .debtToIncomeRatio(dti)
                .riskLevel(riskLevel)
                .approvalStatus(status)
                .user(user)
                .build();

        loanRepository.save(application);

        // 6. Return the DTO
        return LoanResponseDTO.builder()
                .emi(Math.round(emi * 100.0) / 100.0) // Round to 2 decimal places
                .dtiRatio(Math.round(dti * 100.0) / 100.0)
                .riskLevel(riskLevel.name())
                .approvalStatus(status.name())
                .build();
    }



    private RiskLevel classifyRisk(double dti) {
        if (dti < 30) return RiskLevel.LOW;
        if (dti <= 50) return RiskLevel.MEDIUM;
        return RiskLevel.HIGH;
    }

    private ApprovalStatus determineApproval(int creditScore, double dti) {
        if (creditScore >= 750 && dti < 40) return ApprovalStatus.APPROVED;
        if (creditScore >= 650 && dti < 50) return ApprovalStatus.MANUAL_REVIEW;
        return ApprovalStatus.REJECTED;
    }
}