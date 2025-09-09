const button = document.querySelector('.button-add-task') //document = html
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = []


function addNovaTarefa() {
    minhaListaDeItens.push({
        tarefa: input.value, //input.value = pega o texto que o usuário digitou no campo /.push() = adiciona esse texto no final da lista minhaListaDeItens.
        concluida: false
    })  

    input.value = ''  //apaga o que tava escrito na caixa de input

    mostrarTarefas()

}

function mostrarTarefas() {

    let novaLi = ''  //começa vazia

    minhaListaDeItens.forEach((item, index) => {  //vai item por item do array
        novaLi = novaLi + `

            <li class="task ${item.concluida && "done"}">
                <img  src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${index})"> <!--img de Check--> <!-- ./ pra achar o caminho-->
                <p>${item.tarefa}</p>
                <img src="./img/trash.png" alt="deletar-a-tarefa" onclick="deletarTarefa(${index})">
            </li>
        `
    })

listaCompleta.innerHTML = novaLi  //add dentro do html

localStorage.setItem('lista', JSON.stringify(minhaListaDeItens)) // localStorage = onde pode guardar informações, entao quando f5 na pagina vai ficar salvo/setItem(nome pro que vai ficar armazenado, e o que vai armazenar)/ JSON.stringify(minhaListaDeItens) = transforma o objeto pra string 

}

function concluirTarefa(index){
    minhaListaDeItens[index].concluida = !minhaListaDeItens[index].concluida  //vai trocar o valor

    mostrarTarefas()
}

function deletarTarefa(index){
    minhaListaDeItens.splice(index, 1)  //permite que delete o que quiser dentro do array / posição, quantos itens quer deletar a partir da posição /neste caso so quero deletar 1

    mostrarTarefas()
}

function recarregarTarefas(){
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if(tarefasDoLocalStorage){
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)  //transforma de volta pra objeto
    }

    mostrarTarefas()
}

recarregarTarefas()
button.addEventListener('click', addNovaTarefa) //toda vez que acontecer algo no botao ele avisa, neste caso sera avisado somente quando clicado /Quando o botão for clicado, executa a função addNovaTarefa

