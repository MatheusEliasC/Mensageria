function main({name}) {
    console.log('Customer Wishlist: Conectando com banco de dados...');
    if (name!="123") {
        return { 'message': 'Usuário não encontrado' };
    }
    else{
        console.log('Customer Wishlist: Request salvo no banco de dados.');
        return { 'message': 'Request salvo no banco de dados!' };
    }
    console.log('Customer Wishlist: Encerrando conexão com banco de dados...');
}
