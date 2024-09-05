# Etapa 1: Construir a aplicação
FROM node:18-alpine AS builder

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar package.json e package-lock.json para instalar as dependências
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código para o contêiner
COPY . .

# Executar o build da aplicação
RUN npm run build

# Etapa 2: Servir a aplicação com um servidor HTTP estático
FROM nginx:alpine

# Copiar o build gerado na etapa anterior para a pasta padrão do nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor a porta em que o Nginx está servindo
EXPOSE 80

# Comando padrão para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]