FROM node:22-alpine

WORKDIR /app

# Copy package management files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code aplikasi
COPY . .

# Expose port sesuai default Next.js / Vite
EXPOSE 3000

# Jalankan aplikasi dalam mode development
CMD ["npm", "run", "dev"]