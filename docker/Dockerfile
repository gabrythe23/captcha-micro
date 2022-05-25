FROM registry.access.redhat.com/ubi8/nodejs-12

# install runtime dependencies
RUN npm install --global yarn

# copy needed files for build and dependencies
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./tsconfig.build.json ./
COPY ./tsconfig.json ./

# install dependencies
RUN yarn install --no-cache --frozen-lockfile --no-optional

# Bundle app source
COPY ./src ./

# Bundle app source
RUN yarn build

CMD [ "yarn", "start:prod" ]
