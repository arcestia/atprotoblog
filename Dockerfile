# Use an official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Build the application
RUN yarn build

ENV ATP_SERVICE="https://pds.skiddle.id"
ENV ATP_IDENTIFIER="skiddle.id"
ENV ATP_DID="did:plc:kbpcqituf5ku6xorxo2wzdee"

# Expose the port on which the app will run
EXPOSE 3000

# Command to run the app
CMD ["yarn", "remix-serve", "./build/index.js"]