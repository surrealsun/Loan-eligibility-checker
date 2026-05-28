package com.loanchecker.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoanResponseDTO {
    private Double emi;
    private Double dtiRatio;
    private String riskLevel;
    private String approvalStatus;
}