<?php 

class clienteController{
    private $conn;

    public function __construct(){
        $conn= new conexao('localhost','root','','angularjs');
    }

    public static function getCliente(){
        $clienteDAO = new clienteDAO();
        $cliente = $clienteDAO->getCliente();
        if($cliente==true){
            Flight::json($cliente);
        }else{
            Flight::halt(500,"y");
        }
    }

    public static function postCliente(){
        $clienteDAO = new clienteDAO();
        $data = json_decode(file_get_contents('php://input'), true);
        $cliente = $clienteDAO->postCliente($data);
        if($cliente==true){
            Flight::halt(201, 'Criado');
        }else{
            Flight::halt(400, 'Erro ao cadastrar');
        }
    }

    public static function putCliente(){
        $clienteDAO = new clienteDAO();
        $data = json_decode(file_get_contents('php://input'), true);
        $cliente = $clienteDAO->putCliente($data);
        if($cliente==true){
            Flight::halt(200, 'Cliente alterado');
        }else{
            Flight::halt(400, 'Erro ao alterar');
        }
    }

    public static function getByID(){
        $clienteDAO = new clienteDAO();
        $data = json_decode(file_get_contents('php://input'), true);
        $cliente = $clienteDAO->getByID($data);
        if($cliente==true){
            Flight::json($cliente);
        }else{
            Flight::halt(400, 'Erro ao buscar dados do cliente');
        }
    }

    public static function deleteCliente(){
        $clienteDAO = new clienteDAO();
        $data = json_decode(file_get_contents('php://input'), true);
        $cliente = $clienteDAO->deleteCliente($data);
        if($cliente==true){
            Flight::halt(200);
        }else{
            Flight::halt(400, 'Erro ao deletar o cliente');
        }
    }

}


?>