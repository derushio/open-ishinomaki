FROM ubuntu:16.04

MAINTAINER derushio

USER root
ENV HOME /root

RUN apt update
RUN apt upgrade -y
RUN apt install -y \
    vim\
    wget\
    ufw\
    postgresql
RUN mkdir $HOME/download
RUN cd $HOME/download; wget git.io/nodebrew; perl nodebrew setup
RUN echo 'PATH="$HOME/.nodebrew/current/bin:$PATH"' >> $HOME/.profile
ENV PATH $HOME/.nodebrew/current/bin:$PATH
RUN v=7.10.0; nodebrew install-binary $v; nodebrew use $v

ADD ./tool/docker/resource/cmd.sh /cmd.sh
RUN chmod 755 /cmd.sh
EXPOSE 8000

# docker run時に実行される
CMD /cmd.sh
