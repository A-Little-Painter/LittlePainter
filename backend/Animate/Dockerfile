FROM python:3.8-slim

EXPOSE 8700

WORKDIR /app
COPY . .
RUN apt-get update && apt-get install -y wget

# install miniconda3
RUN mkdir -p ~/miniconda3 \
 && wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh \
 && bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3 \
 && touch test.txt \
 && rm -rf ~/miniconda3/miniconda.sh \
 && ~/miniconda3/bin/conda init bash \
 && ~/miniconda3/bin/conda init zsh

#ENV PATH $PATH:home/ubuntu/miniconda3/bin:home/ubuntu/miniconda3/condabin

#RUN conda update

# flask, 필수 라이브러리 및 animated_drawings가 요구하는 모듈 설치
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt  \
 && apt-get install -y libgl1-mesa-glx libglib2.0-0 sudo \
 && pip install -e AnimatedDrawings/. \
 && python3 -m pip install PyOpenGL_accelerate \
 && sudo apt-get install ffmpeg libsm6 libxext6 -y \
 && sudo apt-get install -y python3-opengl \
 && sudo apt-get install -y libosmesa6 \
 && sudo apt-get install -y libosmesa6-dev freeglut3-dev \
 && sudo apt-get install -y libglfw3-dev libgles2-mesa-dev

ENV PYOPENGL_PLATFORM osmesa
# RUN conda install -c conda-forge libstdcxx-ng

# 실행
CMD ["python", "app.py"]