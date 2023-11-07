FROM python:3.8-slim

EXPOSE 8700

WORKDIR /app
COPY . .
RUN apt-get update
RUN apt-get install -y wget

# install miniconda3
RUN mkdir -p ~/miniconda3
RUN wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
RUN bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
RUN rm -rf ~/miniconda3/miniconda.sh
# initialize shell
ENV PATH $PATH:home/ubuntu/miniconda3/bin:home/ubuntu/miniconda3/condabin
RUN ~/miniconda3/bin/conda init bash
RUN ~/miniconda3/bin/conda init zsh

#RUN conda update

# flask, 필수 라이브러리 및 animated_drawings가 요구하는 모듈 설치
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN apt-get install -y libgl1-mesa-glx libglib2.0-0 sudo
RUN pip install -e AnimatedDrawings/.

# Nontype오류 해결용
RUN sudo apt-get install -y libosmesa6-dev freeglut3-dev
RUN sudo apt-get install -y libglfw3-dev libgles2-mesa-dev
ENV PYOPENGL_PLATFORM osmesa
RUN conda install -c conda-forge libstdcxx-ng

RUN python3 -m pip install PyOpenGL_accelerate
RUN sudo apt-get install ffmpeg libsm6 libxext6 -y
RUN sudo apt-get install -y python3-opengl
RUN sudo apt-get install -y libosmesa6

# 실행
CMD ["python", "app.py"]