const end = document.querySelector('#endereco')
const bairro = document.querySelector('#bairro')
const estado = document.querySelector('#estado')
const cidade = document.querySelector('#cidade')
const cep = document.querySelector('#cep')

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
cep.addEventListener('blur', buscarEndereco)
