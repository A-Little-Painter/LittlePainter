package com.yehah.auth.global.email;

import com.yehah.auth.global.redis.entity.EmailAuth;
import com.yehah.auth.global.redis.repository.EmailAuthRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

    private final EmailAuthRepository emailAuthRepository;

    public void sendAuthCode(String email, String authCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email); // 수신자 이메일 주소
        message.setSubject("인증 코드"); // 제목
        message.setText("인증 코드는 " + authCode + " 입니다."); // 내용

        javaMailSender.send(message);

        emailAuthRepository.save(new EmailAuth(email, authCode));
    }

    public EmailAuth getEmailAuth(String authCode){
        return emailAuthRepository.findByAuthCode(authCode);
    }

    public void deletEmailAuth(String email){
        emailAuthRepository.deleteById(email);
    }
}
