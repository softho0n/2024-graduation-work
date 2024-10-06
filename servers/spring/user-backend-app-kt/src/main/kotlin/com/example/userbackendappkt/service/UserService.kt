package com.example.userbackendappkt.service

import com.example.userbackendappkt.dto.LoginRequestDto
import com.example.userbackendappkt.dto.SignUpRequesetDto
import com.example.userbackendappkt.dto.User
import com.example.userbackendappkt.repository.UserRepository
import io.jsonwebtoken.Jwt
import io.jsonwebtoken.JwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import java.util.*

@Service
class UserService(
    @Autowired private val userRepository: UserRepository,
    @Autowired private val pwdEncoder: BCryptPasswordEncoder,
) {

    companion object {
        private val SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
        private val EXPIRATION_TIME = 15 * 60 * 1000
    }

    fun registerUser(request: SignUpRequesetDto): String {
        if (userRepository.findByUsername(request.username) != null) {
            throw RuntimeException("Username is already registered")
        }

        if (userRepository.findByNickname(request.nickname) != null) {
            throw RuntimeException("Nickname is already registered")
        }

        val hashedPasword = getPasswordHash(request.password)
        val newUser = User(
            username = request.username,
            password = hashedPasword,
            nickname = request.nickname,
        )
        userRepository.save(newUser)

        return createAccessToken(newUser.username)
    }

    fun loginUser(loginRequest: LoginRequestDto): String {
        val user = dbGetUserByUsername(loginRequest.username)
        if (user != null) {
            if (!verifyPassword(loginRequest.password, user.password)) {
                throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect password.")
            }
            return createAccessToken(user.username)
        }
        throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect username.")
    }

    fun fetchUserProfile(accessToken: String): User {
        val tokenValidation = checkValidationAccessToken(accessToken)
        if (tokenValidation["valid"] == true) {
            val currentUser = dbGetUserByUsername(tokenValidation["username"] as String)
            return currentUser ?: throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found.")
        }
        throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid Token.")
    }

    fun updateProfile(request: SignUpRequesetDto): String {
        val currentUser = dbGetUserByUsername(request.username)
        val hashedPasword = getPasswordHash(request.password)

        if (currentUser != null) {
            val updateCommand = User(
                username = currentUser.username,
                password = hashedPasword,
                nickname = currentUser.nickname,
            )
            userRepository.save(updateCommand)
            return "txn was executed well."
        }
        throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid Profile Update Request.")
    }

    fun checkValidationAccessToken(accessToken: String): Map<String, Any> {
        return try {
            val claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(accessToken)
                .body

            val username = claims["sub"] as String?
            if (username == null) {
                mapOf("valid" to false, "username" to "")
            } else {
                val user = dbGetUserByUsername(username)
                if (user == null) {
                    mapOf("valid" to false, "username" to "")
                } else {
                    mapOf("valid" to true, "username" to "$username")
                }
            }
        } catch (e: JwtException) {
            mapOf("valid" to false, "username" to "invalid")
        }
    }

    private fun dbGetUserByUsername(username: String): User? {
        return userRepository.findByUsername(username) ?: throw RuntimeException("User not found")
    }

    private fun verifyPassword(rawPassword: String, hashedPasword: String): Boolean {
        return pwdEncoder.matches(rawPassword, hashedPasword)
    }

    private fun getPasswordHash(password: String): String {
        return pwdEncoder.encode(password)
    }

    private fun createAccessToken(username: String): String {
        val claims = Jwts.claims().setSubject(username)
        val expiration = Date(System.currentTimeMillis() + EXPIRATION_TIME)
        return Jwts.builder()
            .setClaims(claims)
            .setExpiration(expiration)
            .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
            .compact()
    }
}
