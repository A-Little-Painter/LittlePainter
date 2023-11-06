FROM python:3.8-slim

EXPOSE 8700

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

RUN apt-get update && apt-get install -y libgl1-mesa-glx libglib2.0-0

COPY . .

RUN pip install -e AnimatedDrawings/.

CMD ["python", "app.py"]