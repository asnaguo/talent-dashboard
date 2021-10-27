FROM node:lts

WORKDIR /home

COPY ./package.json /home/package.json
RUN cd /home;yarn;
COPY . /home
RUN echo $STAGE
RUN cd /home; yarn; yarn build

ENV NUXT_HOST=0.0.0.0
CMD yarn start
