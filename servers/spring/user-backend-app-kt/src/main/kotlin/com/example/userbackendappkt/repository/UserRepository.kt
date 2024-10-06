package com.example.userbackendappkt.repository

import com.example.userbackendappkt.dto.User
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository: MongoRepository<User, String> {
    fun findByUsername(username: String): User?
    fun findByNickname(nickname: String): User?
}
