var httpModule = angular.module('http', []);

httpModule.factory('HttpService', ['$http', function ($http) {

        var urlWs = 'https://private-7cf60-4youseesocialtest.apiary-mock.com/';
        var funtions = {};
        /**
         * Recupera informações sobre o recurso identificado pela URI.
         * Ex: listar produtos, visualizar o produto 45.
         * Uma requisição GET não deve modificar nenhum recurso do seu sistema,
         * ou seja, não deve ter nenhum efeito colateral, você apenas recupera 
         * informações do sistema.
         * @param {string} webservice
         * @param {object} params  
         * @param {string or object} data 
         * @param {function} sucesso
         * @param {function} falha
         * @param {string} responseType exemplo: arraybuffer
         * @returns {undefined}
         */
        funtions.get = function (webservice, params, data, sucesso, falha,responseType) {
            execute('GET', webservice, params, data, sucesso, falha,responseType);
        };
        /**
         * Adiciona informações usando o recurso da URI passada.
         * Ex: adicionar um produto. 
         * Pode adicionar informações a um recurso ou criar um novo recurso.
         * @param {string} webservice
         * @param {object} params  
         * @param {string or object} data 
         * @param {function} sucesso
         * @param {function} falha
         * @param {string} responseType exemplo: arraybuffer
         * @returns {undefined}
         */
        funtions.post = function (webservice, params, data, sucesso, falha,responseType) {
            execute('POST', webservice, params, data, sucesso, falha,responseType);
        };
        /**
         * Adiciona (ou modifica) um recurso na URI passada. 
         * Ex: atualizar um produto. A diferença fundamental entre um PUT e um 
         * POST é que no POST a URI significa o lugar que vai tratar a informação, 
         * e no PUT significa o lugar em que a informação será armazenada.
         * @param {string} webservice
         * @param {object} params  
         * @param {string or object} data 
         * @param {function} sucesso
         * @param {function} falha
         * @param {string} responseType exemplo: arraybuffer
         * @returns {undefined}
         */
        funtions.put = function (webservice, params, data, sucesso, falha,responseType) {
            execute('PUT', webservice, params, data, sucesso, falha,responseType);
        };
        /**
         * Remove o recurso representado pela URI passada. Ex: remover um produto.
         * @param {string} webservice
         * @param {object} params  
         * @param {string or object} data 
         * @param {function} sucesso
         * @param {function} falha
         * @param {string} responseType exemplo: arraybuffer
         * @returns {undefined}
         */
        funtions.delete = function (webservice, params, data, sucesso, falha,responseType) {
            execute('DELETE', webservice, params, data, sucesso, falha,responseType);
        };


        var execute = function (metodo, webservice, params, data, sucesso, falha,responseType) {
            $http({method: metodo,
                url: urlWs + webservice,
                params: params,
                data: data,
                responseType: responseType,
                headers: {
                    'Content-Type': 'application/json ; charset=UTF-8'
                }})
                    .success(function (data, status, headers, config) {
                        if (typeof sucesso !== 'undefined') {
                            sucesso(data, status);
                        }
                    })
                    .error(function (data, status, headers, config) {
                        if (typeof falha !== 'undefined') {
                            falha(data, status);
                        }
                    });
        };
        return funtions;
    }]);

httpModule.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);