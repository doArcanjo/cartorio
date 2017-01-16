// import accountTransformer from './../../transformers/account';
import store from './../../store';

function schema() {
    return {
        resumeTableHeaders: ['Ano','N.º', 'Registo', 'Noivo', 
        'Noiva', 'Data insc.', 'Data cas.','',''],

        resumeTableFields: ['ano','n_inscricao', 'numero', 'noivo', 
            'noiva', 'd_insc', 'd_casam','editar','apagar']
        ,
        TableHeaders:{
            'n_inscricao':'N.º',
            'numero':'Reg',
            'd_insc':'Data insc.',
            'd_casam':'Data cas.'
        } 
    };

}

function viewLayout() {
    return {
        model: 'weddings',
        viewUsageName: 'casamentos',
        fields: schema()
    }

}

function componentProperties() {
    return {
        singleItemPath: '/weddings/'
    }
}

function getAllItems() {

    // When the request succeeds
    const success = (account) => {
        account = accountTransformer.fetch(account);

        store.dispatch('getAccount', account);
    };

    // When the request fails
    const failed = () => {};

    /*
     * Normally you would perform an AJAX-request.
     * But to get the example working, the data is hardcoded.
     *
     * With the include REST-client Axios, you can do something like this:
     * Vue.$http.get('/account')
     *   .then((response) => {
     *     success(response);
     *   })
     *   .catch((error) => {
     *     failed(error);
     *   });
     */
    const succeeds = true;

    if (succeeds) {
        success({
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@doe.com',
        });
    } else {
        failed();
    }

}

export default {
    vl: viewLayout(),
    cp: componentProperties()
};
