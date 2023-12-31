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
- Python 3.8
- Flask 3.0.0

# 배포 및 빌드 (환경파일)

### 프론트엔드 : <br></br>
https://drive.google.com/file/d/1DCX1IPkV2-KZlImCQE5IJQh6QVNmV1dO/view?usp=drive_link

### 백엔드 : <br></br>
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
### 애니메이션 머신러닝 배포
- 1-1. ubuntu 환경에 도커 엔진 설치
```bash
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg


# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
- 1-2. 설치 확인
```bash
sudo docker run hello-world
```
- 2. ubuntu 환경에 도커-데스크탑 설치
```bash
sudo apt install gnome-terminal


sudo apt remove docker-desktop
# complete remove
rm -r $HOME/.docker/desktop
sudo rm /usr/local/bin/com.docker.cli
sudo apt purge docker-desktop

wget https://desktop.docker.com/linux/main/amd64/docker-desktop-4.25.0-amd64.deb?utm_source=docker&utm_medium=webreferral&utm_campaign=docs-driven-download-linux-amd64&_gl=1*1yotftr*_ga*NTA0NTMwMjA2LjE2OTgwMjY5MTI.*_ga_XJWPQMJYHQ*MTY5ODc5Nzc4My44LjEuMTY5ODc5ODkyOS4yNS4wLjA.
sudo apt-get update
sudo apt-get install {다운받은 deb파일}

# 실행 확인
docker compose version
docker --version
docker version
systemctl status docker

# 자동실행 설정
systemctl --user enable docker-desktop
```

### port
- 80 TCP: this port is used by the generation process.
- 443 TCP: default in standard https port.

### 그 외 사용 port
- Jenkins 8080, 8082
- auth-service 8700


### 배포 특이사항
- ### git clone
- https://github.com/A-Little-Painter/configServer.git
- https://github.com/A-Little-Painter/gateway.git
- https://github.com/A-Little-Painter/eureka.git
<br></br>
<br></br>
- docker build -t [이미지명]:[태그] .
- docker run -d -p [포트번호]:[포트번호]
