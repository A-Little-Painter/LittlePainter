FROM continuumio/miniconda3:latest

#기본 환경 설정
EXPOSE 8700
WORKDIR /app
COPY . .
RUN apt-get update \
    && apt-get install -y vim \
    && conda update conda \
    && conda install -y python=3.8.13 \
# flask, 필수 라이브러리 및 animated_drawings가 요구하는 모듈 설치
    && apt-get install -y libgl1-mesa-glx libglib2.0-0 sudo \
    && pip install -r requirements.txt \
    && pip install -e AnimatedDrawings/.

# 렌더링 에러(AttributeError: 'NoneType' object has no attribute 'decode') 해결 1
RUN sudo apt-get install -y libosmesa6-dev freeglut3-dev \
    && sudo apt-get install -y libglfw3-dev libgles2-mesa-dev \
    && sudo apt-get install -y libosmesa6 \
    && export PYOPENGL_PLATFORM=osmesa \
    && conda install -c conda-forge libstdcxx-ng \
    && conda install cmake \
# 렌더링 에러 해결 2
    && python3 -m pip install PyOpenGL_accelerate \
    && sudo apt-get install ffmpeg libsm6 libxext6 -y \
    && sudo apt-get install -y python3-opengl
    #&& sudo apt-get install -y libosmesa6

# 실행
CMD ["python", "app.py"]