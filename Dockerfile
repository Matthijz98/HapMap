# Pull base image
FROM python:3.7

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /code

# Install dependencies
RUN pip install pipenv
COPY requirements.txt /code/
RUN pip install -r requirements.txt

# Copy project
COPY . /code/

RUN python manage.py makemigrations