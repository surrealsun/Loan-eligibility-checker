// dto/LoginRequest.java

package com.loanchecker.dto;

import lombok.Data;

@Data
public class LoginRequest {

    private String username;  // ✅ changed
    private String password;
}