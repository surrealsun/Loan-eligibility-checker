package com.loanchecker.util;

public class EmiCalculatorUtil {

    public static double calculateEMI(double principal, double annualRate, int months) {
        if (annualRate == 0) {
            return principal / months;
        }
        
        double monthlyRate = annualRate / 12 / 100;
        double numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, months);
        double denominator = Math.pow(1 + monthlyRate, months) - 1;
        
        return numerator / denominator;
    }
}