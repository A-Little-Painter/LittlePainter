package com.yehah.auth.global.email;

import com.yehah.auth.domain.auth.dto.request.CheckAuthCodeRequestDTO;
import com.yehah.auth.domain.auth.exception.DatabaseInsertException;
import com.yehah.auth.domain.auth.exception.EmailSendingException;
import com.yehah.auth.domain.auth.exception.ExpiredAuthCodeException;
import com.yehah.auth.domain.auth.exception.InvalidCodeException;
import com.yehah.auth.global.redis.entity.EmailAuth;
import com.yehah.auth.global.redis.repository.EmailAuthRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
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

        try{
            javaMailSender.send(message);
        } catch (MailException e){
            throw new EmailSendingException("이메일 전송에 실패했습니다.");
        }

        try{
            emailAuthRepository.save(new EmailAuth(email, authCode));
        }catch (DataAccessException e){
            throw new DatabaseInsertException("데이터베이스에 저장에 실패했습니다.");
        }
    }

    public ResponseEntity<?> getEmailAuth(CheckAuthCodeRequestDTO checkAuthCodeRequestDTO){
        EmailAuth emailAuth = emailAuthRepository.findByAuthCode(checkAuthCodeRequestDTO.getCode());

        if(emailAuth == null){
            throw new ExpiredAuthCodeException("인증 번호가 만료되었습니다");
        }
        else if(emailAuth.getEmail().equals(checkAuthCodeRequestDTO.getEmail())){
            deleteEmailAuth(checkAuthCodeRequestDTO.getEmail());
            return ResponseEntity.ok().build();
        }
        else{
            throw new InvalidCodeException("인증 번호가 올바르지 않습니다.");
        }
    }

    public void deleteEmailAuth(String email){
        emailAuthRepository.deleteById(email);
    }
}
