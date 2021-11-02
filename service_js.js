const openwhisk = require('openwhisk');
const ow = openwhisk();

function main({name}) {
    const chained_action_results = [];

    console.log('Construindo sequência de chamadas.');
    console.log('Chamando customer wishlist...');
    return ow.actions.invoke({ 
        name: 'SDJS/customer_wishlist_js',
        blocking: true,
        result: true,
        params: {name}
    })
    .then((result) => {
        console.log('Resultado de customer wishlist: ' + JSON.stringify(result));

        // chained_action_results.push(result);

        console.log('Chamando customer demographs...');

        return ow.actions.invoke({
            name: 'SDJS/customer_demographs_js',
            blocking: true,
            result: true,
            params: {name}
        });
    })
    .catch((error) => {
        console.log('Um erro ocorreu! ' + JSON.stringify(error));
        throw error;
    })
    .then((result) => {
        console.log('Resultando de customer demographs: ' + JSON.stringify(result));

        chained_action_results.push(result);

        console.log('Sequência de chamadas concluída.');

                return {
            action_results: chained_action_results
        };
    })
    .catch((error) => {
        console.log('Um erro ocorreu! ' + JSON.stringify(error));

        console.log('A sequência de chamadas falhou');

                throw error;
    });
}
