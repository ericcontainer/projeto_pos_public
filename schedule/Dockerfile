FROM python:alpine3.18

# upgrade pip
RUN pip install --upgrade pip

# get curl for healthchecks
RUN apk add curl
RUN apk add libstdc++
RUN apk add gcompat
RUN apk add libc6-compat

# permissions and nonroot user for tightened security
RUN adduser -D nonroot
RUN mkdir /home/app/ && chown -R nonroot:nonroot /home/app
RUN mkdir /home/app/venv
RUN mkdir -p /var/log/flask-app && touch /var/log/flask-app/flask-app.err.log && touch /var/log/flask-app/flask-app.out.log
RUN chown -R nonroot:nonroot /var/log/flask-app
WORKDIR /home/app
USER nonroot

# copy all the files to the container
COPY --chown=nonroot:nonroot . .

# venv
ENV VIRTUAL_ENV=/home/app/venv

# python setup
RUN pip install -r requirements.txt
RUN export FLASK_APP=app.py

# define the port number the container should expose
EXPOSE 5000

CMD ["python", "wsgy.py"]