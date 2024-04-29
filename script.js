const nome = document.querySelector('#nome')
const email = document.querySelector('#email')
const end = document.querySelector('#endereco')
const bairro = document.querySelector('#bairro')
const estado = document.querySelector('#estado')
const cidade = document.querySelector('#cidade')
const cep = document.querySelector('#cep')
const numero = document.querySelector('#numero')
const botao = document.getElementById('botao')

function preencherCampos(endereco){
    end.value = endereco.logradouro
    bairro.value = endereco.bairro
    estado.value = endereco.uf
    cidade.value = endereco.localidade
}

function isValidCep(cep){
    return cep.length === 8 && /^[0-9]+$/.test(cep)
}


function buscarEndereco() {
    const url = `https://viacep.com.br/ws/${cep.value}/json/`
    if(isValidCep(cep.value)){
        fetch(url)
            .then((response)=>response.json())
            .then((endereco)=>{
                if(endereco.erro === true){
                    end.value = 'Endereço não encontrado!'
                }else{
                    preencherCampos(endereco)
                }
        })
    }else{
        end.value = 'Cep Invalido!!'
    }
}

function salvarDados(){
    const valor = {
        nome: nome.value,
        email: email.value,
        cep: cep.value,
        end: end.value,
        bairro: bairro.value,
        estado: estado.value,
        cidade: cidade.value,
        numero: numero.value
    }
    valor_json = JSON.stringify(valor)

    localStorage.setItem('meuCep', valor_json)
    alert('Dados Salvos!')
}

botao.addEventListener('click', salvarDados)
cep.addEventListener('blur', buscarEndereco)
