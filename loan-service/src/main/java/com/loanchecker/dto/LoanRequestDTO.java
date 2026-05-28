package com.loanchecker.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoanRequestDTO {

    @NotNull
    @Min(1000)
    private Double monthlyIncome;

    @NotNull
    @Min(0)
    private Double existingEmi;

    @NotNull
    @Min(10000)
    private Double requestedLoanAmount;

    @NotNull
    @Min(6)
    private Integer loanTenureMonths;

    @NotNull
    @Min(1)
    private Double annualInterestRate;

    @NotNull
    @Min(300)
    private Integer creditScore;
}