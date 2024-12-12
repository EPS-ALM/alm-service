ALM-SERVICE

Repositório destinado para o serviço que estabelecerá a comunicação com o front end.

## Arquivo .env Necessário

Para configurar o ambiente e garantir que a aplicação funcione corretamente, crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```
NODE_ENV='development'

DB_HOST=db_alm DB_USER=alm-admin DB_PASS=almadmin2q938734982130dbnsjd9812bnkcs DB_NAME=db_alm

DATABASE_URL=postgres://alm-admin:almadmin2q938734982130dbnsjd9812bnkcs@db_alm:5432/db_alm

IP= seu-ip
```


Certifique-se de substituir os valores acima se necessário para adequar às suas configuraçõoes
