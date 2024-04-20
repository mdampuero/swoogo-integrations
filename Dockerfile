# Usa una imagen base de Node.js
FROM node:latest AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json a /app
COPY package.json ./

# Instala las dependencias
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila la aplicación Angular
RUN npm run build -- 

# Segunda etapa para la imagen final
FROM nginx:alpine

# Copia los archivos de construcción de Angular al servidor web Nginx
COPY --from=builder /app/dist/* /usr/share/nginx/html/

# Copia el archivo de configuración personalizado de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
