
//Controller dos clientees
angular.module("clientes").controller("clientesCtrl", function ($scope, $http, $window) {
    //Incialização dos estados e as cidades
    $scope.estados=[
        {nome:"SP"},
        {nome:"MG"},
        {nome:"RJ"},
    ]
    $scope.cidades=[
        {nome:"São Paulo"},
        {nome:"Guarulhos"},
        {nome:"Bangu"},
    ]
    //Carregar os contatos do banco
    var carregarContatos = function () {
        $http.get("http://localhost/treino/php/cliente/carregarCliente").then(function (response) {
            $scope.clientes = response.data;
        })
        .catch(function (response){
            $window.alert("Erro ao carregar os clientes");
        })
    };
    //Limpar todos input e reseta os erros de digitação
    var limparCliente = function () {
        $scope.ClienteForm.$setPristine();
        delete $scope.cliente;
        carregarContatos();
        $scope.checkEmail = false;
        $scope.check = false;
    };

    $scope.limparCliente= function(){
        limparCliente();
    }
    //Adicionar cliente validando o email.
    $scope.adicionarCliente = function (cliente){
        $http.post("http://localhost/treino/php/cliente/criarCliente", cliente).then(function (response) {
                limparCliente();
            }).catch(function (response)  {
                $scope.checkEmail = true;
                $scope.ClienteForm.email.$setPristine();
            });
    }

    //Puxa todos dados do cliente atraves do id e coloca nos input text, mudando o botão para o atualizar.
    $scope.editarCliente = function (cliente) {
        $http.post("http://localhost/projeto/php/cliente/buscarDados", cliente).then(function (response) {
            $scope.cliente=[];
            $scope.cliente.nome = response.data[0].nome;
            $scope.cliente.sobrenome = response.data[0].sobrenome;
            $scope.cliente.email = response.data[0].email;
            $scope.cliente.telefone = response.data[0].telefone;
            $scope.cliente.dataDeNascimento = response.data[0].dataDeNascimento;
            $scope.cliente.estado = response.data[0].estado;
            $scope.cliente.cidade = response.data[0].cidade;
            $scope.cliente.sexo = response.data[0].sexo;
            $scope.cliente.idCliente = response.data[0].idCliente;
            $scope.check = true;
        }).catch(function (response) {            
            $window.alert("Erro ao encontrar o cliente");
        });
    }

    //Atualiza o cliente conforme os dados passados no $scope.
    $scope.atualizarCliente = function (cliente) {
        $http({
            method:"POST",
            url:"http://localhost/projeto/php/cliente/editarCliente",
            data:{'idCliente':$scope.cliente.idCliente, 
                'nome':$scope.cliente.nome,
                'sobrenome':$scope.cliente.sobrenome, 
                'email':$scope.cliente.email, 
                'telefone':$scope.cliente.telefone, 
                'dataDeNascimento':$scope.cliente.dataDeNascimento, 
                'estado':$scope.cliente.estado,
                'cidade':$scope.cliente.cidade, 
                'sexo':$scope.cliente.sexo}
            }).then(function (response) {
            limparCliente();    
        }).catch(function (response) { 
            console.log("caiu aqui");           
            $scope.checkEmail = true;
        });
    }

    //Deleta o cliente com o idCliente passado através do modal.
    $scope.deletarCliente = function (cliente) {
        $http({
            method:"POST",
            url:"http://localhost/projeto/php/cliente/deletarCliente",
            data:{'idCliente':$scope.cliente.idClienteDelete ,  
                'email':$scope.cliente.emailClienteDelete}
            }).then(function (response) {
            limparCliente();
            $window.alert("Cliente deletado com sucesso");
        }).catch(function (response){
            $window.alert("Erro ao deletar o cliente");
        });
    }

    //Salva o id e o email do cliente para ser mandando para o modal.
    $scope.salvarCliente = function (cliente) {
        $scope.cliente=[];
        $scope.cliente.idClienteDelete = cliente.idCliente;
        $scope.cliente.emailClienteDelete = cliente.email;
    }

    //Através do input de pesquisa busca o campo, e também retorna na ordem que desejar.
    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    }

    carregarContatos();
});
