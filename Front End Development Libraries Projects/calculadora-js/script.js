
// Estamos capturando qualquer evento de click dentro da "calculadora"
document.getElementById("calculadora").addEventListener('click', function(e){
    const resultado = document.getElementById("resultado");
    // Informações do evento capturado
    const {nodeName, value} = e.target;
    const memoria = document.getElementById("mem");

    /*
    Funcao para verificar se o comeco do resultado é alguma operação mais zero, neste caso
    queremos modificar apenas o zero, primeiro faz-se um regex verificando, dependendo do
    resultado retorna-se o novo número ou o concatena
    */
    function compare(x) {
        if (resultado.innerHTML.search(/[/+*-]0/) >= 0) {
            resultado.innerHTML = resultado.innerHTML.replace(resultado.innerHTML[1], x);
        } else if (resultado.innerHTML == "0") {
            resultado.innerHTML = x;
        } else {

            resultado.innerHTML = resultado.innerHTML.concat(x);
        }
    }

    /*
    Funcao para fazer a conta necessaria, ela é sempre passada quando clicamos o = ou
    qualquer outra operação, porém com um caso especifico para o /, nessa iteração da
    calculadora, sempre que chamada uma nova operação fazemos a que já estava pendente.
    RETORNA uma STRING
    */
    function operacao(x) {
        let resFloat = parseFloat(resultado.innerHTML.slice(1));
        let memFloat = parseFloat(memoria.innerHTML);
        switch (x) {
            case "+":
                // Se a mem estiver vazia temos que jogar o resultado direto para ela
                if (memoria.innerHTML == "0") {
                    if (resultado.innerHTML.search(/[/+*-]/) >= 0) {
                        return resFloat.toString()
                    } else {
                        return resultado.innerHTML
                    }
                } else {
                    return (memFloat + resFloat).toString();
                }

            case "-":
                if (memoria.innerHTML == "0") {
                    if (resultado.innerHTML.search(/[/+*-]/) >= 0) {
                        return resFloat.toString()
                    } else {
                        return resultado.innerHTML
                    }
                } else {
                    return (memFloat - resFloat).toString()
                }

            case "/":
                if (memoria.innerHTML == "0") {
                    if (resultado.innerHTML.search(/[/+*-]/) >= 0) {
                        return resFloat.toString()
                    } else {
                        return resultado.innerHTML
                    }
                } else {
                    if (resFloat == 0) {
                        return "0";
                    } else {
                        return (memFloat / resFloat).toString();
                    }
                }

            case "*":
                if (memoria.innerHTML == "0") {
                    if (resultado.innerHTML.search(/[/+*-]/) >= 0) {
                        return resFloat.toString()
                    } else {
                        return resultado.innerHTML
                    }
                } else {
                    return (memFloat * resFloat).toString();
                }

            // Chamamos a própria função para ela lidar com a conta
            case "=":
                return operacao(resultado.innerHTML[0]);

            // Caso o usuário fique clicando "=", já que a recursivade vai passar um número
            default:
                return resultado.innerHTML;
        }
    }

    /*
    A partir do node do evento se for um botão, bota a mão na massa. Fazendo um switch
    para todos os casos
    */
    if(nodeName == "BUTTON") {
        switch (value) {
            case "0":
                compare(value);
                break;

            case "1":
                compare(value);
                break;

            case "2":
                compare(value);
                break;

            case "3":
                compare(value);
                break;

            case "4":
                compare(value);
                break;

            case "5":
                compare(value);
                break;

            case "6":
                compare(value);
                break;

            case "7":
                compare(value);
                break;

            case "8":
                compare(value);
                break;

            case "9":
                compare(value);
                break;

            case "/":
                memoria.innerHTML = operacao("/");
                resultado.innerHTML = "/0";
                break;

            case "*":
                memoria.innerHTML = operacao("*");
                resultado.innerHTML = "*0";
                break;

            case "-":
                memoria.innerHTML = operacao("-");
                resultado.innerHTML = "-0";
                break;

            case "=":
                resultado.innerHTML = operacao("=");
                break;

            case "+":
                memoria.innerHTML = operacao("+");
                resultado.innerHTML = "+0";
                break;

            case "L":
                resultado.innerHTML = "0";
                memoria.innerHTML = "0";
                break;

            case "C":
                resultado.innerHTML = "0";
                break;

            case ".":
                resultado.innerHTML = resultado.innerHTML.concat(".")
            break;
        }
    }

} , false);

