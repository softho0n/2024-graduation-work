package com.example.userbackendappkt.controller

import com.example.userbackendappkt.dto.LoginRequestDto
import com.example.userbackendappkt.dto.SignUpRequesetDto
import com.example.userbackendappkt.dto.TokenDto
import com.example.userbackendappkt.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses


@RestController
@RequestMapping("/user")
class UserContoller(private val userService: UserService) {

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "유저 회원가입을 진행한다.", description = "Register a new user and return an access token.")
    @ApiResponses(
        value = [
            ApiResponse(responseCode = "201", description = "User registered successfully"),
            ApiResponse(responseCode = "400", description = "Invalid input"),
            ApiResponse(responseCode = "500", description = "Internal server error")
        ]
    )
    fun registerUser(@RequestBody signUpRequesetDto: SignUpRequesetDto): TokenDto {
        val accessToken = userService.registerUser(signUpRequesetDto)
        return TokenDto(accessToken)
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "유저 로그인을 진행한다.", description = "Log in a user and return an access token.")
    fun login(@RequestBody loginRequestDto: LoginRequestDto): TokenDto {
        val accessToken = userService.loginUser(loginRequestDto)
        return TokenDto(accessToken)
    }
}
