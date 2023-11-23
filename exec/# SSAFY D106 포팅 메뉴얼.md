# SSAFY D106 포팅 메뉴얼

# 개발 및 배포 환경

## 프론트엔드

- React Router Dom 6.14.1
- React 18.2.0
- react-native 0.72.6
- Node.js >= 16
- eas 0.1.0

## 백엔드

- Java 17
- IntelliJ 2023.1.4
- Spring Boot 3.0.2
- MySQL 8.0.33
- redis 7.0.12

# 배포 및 빌드 (환경파일)

프론트엔드 : https://drive.google.com/file/d/1DCX1IPkV2-KZlImCQE5IJQh6QVNmV1dO/view?usp=drive_link

백엔드 : 
docker run -d -p 8050:8050 redis <br></br>
각각의 마이크로서비스 폴더 안에 들어간 후
- docker build -t [이미지명]:[태그] .
- docker run -d -p [포트번호]:[포트번호]

### port

- 80 TCP: this port is used by the generation process.
- 443 TCP: default in standard https port.

### 그 외 사용 port
- Jenkins 8080, 8081
- Redis 8050
- Eureka-Server 8761
- gateway 9000, 9001
- config-server 9900

- auth-service 8100
- user-service 8200
- draw-service 8300
- image-service 8400
- detection-service 8500
- similarcheck-service 8600

## 두 번째 ec2

### port
- 80 TCP: this port is used by the generation process.
- 443 TCP: default in standard https port.

### 그 외 사용 port
- Jenkins 8080, 8082
- auth-service 8700


### 배포 특이사항
git pull 
- https://github.com/A-Little-Painter/configServer.git
- https://github.com/A-Little-Painter/gateway.git
- https://github.com/A-Little-Painter/eureka.git
