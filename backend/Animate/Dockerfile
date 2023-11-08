FROM continuumio/miniconda3:latest

#기본 환경 설정
EXPOSE 8700
WORKDIR /app
COPY . .
RUN apt-get update

RUN conda create -y --name animated_drawings python=3.8.13 \
  && conda activate animated_drawings  \
  && conda install -c conda-forge libstdcxx-ng  \
  && pip install -e AnimatedDrawings/. \
  && python3 -m pip install PyOpenGL_accelerate \
  && pip install -r requirements.txt \

# flask, 필수 라이브러리 및 animated_drawings가 요구하는 모듈 설치
COPY requirements.txt requirements.txt
RUN apt-get install -y libgl1-mesa-glx libglib2.0-0 sudo \
  && sudo apt-get install ffmpeg libsm6 libxext6 -y \
  && sudo apt-get install -y python3-opengl \
  && sudo apt-get install -y libosmesa6 \
  && sudo apt-get install -y libosmesa6-dev freeglut3-dev \
  && sudo apt-get install -y libglfw3-dev libgles2-mesa-dev

ENV PYOPENGL_PLATFORM osmesa
RUN conda install -c conda-forge libstdcxx-ng

# 실행
CMD ["python", "app.py"]