# Instruções para conectar ao GitHub

Como você já possui um repositório chamado "newportfolio" no GitHub, vamos conectar seu projeto local a esse repositório existente.

## 1. Conecte seu repositório local ao GitHub existente

Execute os seguintes comandos no terminal:

```bash
# Conectar ao repositório remoto existente
git remote add origin https://github.com/devMatheusOliv/newportfolio.git

# Verificar se a conexão foi estabelecida corretamente
git remote -v
```

## 2. Lidar com possíveis conflitos (caso o repositório remoto já tenha conteúdo)

Se o repositório remoto já tiver conteúdo diferente do seu repositório local, você tem duas opções:

### Opção 1: Forçar o envio do seu conteúdo local (substituirá o conteúdo remoto)

```bash
# Use com cuidado, pois isso substituirá o conteúdo do repositório remoto
git push -u origin master --force
```

### Opção 2: Mesclar o conteúdo remoto com o local (recomendado se houver conteúdo importante no remoto)

```bash
# Baixar o conteúdo do repositório remoto
git pull origin master --allow-unrelated-histories

# Resolver quaisquer conflitos de mesclagem que possam surgir
# Depois de resolver os conflitos, adicione e faça commit das alterações
git add .
git commit -m "Mesclando conteúdo local com remoto"

# Enviar o conteúdo mesclado para o GitHub
git push -u origin master
```

## 3. Se o repositório estiver vazio ou você quiser substituir completamente

```bash
# Envie seu código para o GitHub
git push -u origin master
```

## 4. Verifique se tudo foi enviado corretamente

1. Acesse seu repositório no GitHub (https://github.com/devMatheusOliv/newportfolio)
2. Você deverá ver todos os arquivos do seu projeto listados
3. Verifique se o README.md está sendo exibido corretamente na página inicial do repositório

## 5. Configurações adicionais (opcional)

### Configurar GitHub Pages

Para publicar seu portfólio usando o GitHub Pages:

1. No seu repositório, vá para "Settings" > "Pages"
2. Em "Source", selecione "master" (ou "main") e clique em "Save"
3. Aguarde alguns minutos e seu site estará disponível em `https://devMatheusOliv.github.io/newportfolio`

## 6. Fluxo de trabalho futuro

Para futuras alterações no seu projeto:

```bash
# Verifique as alterações
git status

# Adicione as alterações
git add .

# Faça um commit com uma mensagem descritiva
git commit -m "Descrição das alterações"

# Envie para o GitHub
git push
```
