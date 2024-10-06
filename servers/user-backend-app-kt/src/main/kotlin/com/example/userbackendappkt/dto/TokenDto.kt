package com.example.userbackendappkt.dto

data class TokenDto(
    val access_token: String,
    val token_type: String = "bearer",
)
