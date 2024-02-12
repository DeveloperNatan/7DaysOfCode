let nome = document.getElementById('nome');
let data = document.getElementById('data');
let res = document.getElementById('res');
let nomeres = document.querySelector('.lista');
let datares = document.querySelector('.listaa');

exibirTransacoesArmazenadas();

const LocalStorageTransaction = JSON.parse(localStorage.getItem('transaction')) || [];

res.addEventListener('click', function () {
    let perfil = {
        id: Date.now(),
        owner: nome.value,
        content: data.value,
    }

    // Correção para interpretar a data no formato americano (mês/dia/ano)
    let dataFormatada = perfil.content;
    let partesData = dataFormatada.split('-');
    let dataObj = new Date(partesData[0], partesData[1] - 1, partesData[2]);
    let adata = `${dataObj.getDate()}/${dataObj.getMonth() + 1}/${dataObj.getFullYear()}`;

    let lista = document.querySelector('.lista');
    lista.insertAdjacentHTML('afterbegin', `
        <li data-id="${perfil.id}"> 
            <span contenteditable class="editable-span">
                ${perfil.owner}
            </span>
        </li>`);

    let listaa = document.querySelector('.listaa');
    listaa.insertAdjacentHTML('afterbegin', `
        <li data-id="${perfil.id}">           
            <button type="button" class="delecao">Delete</button>
            <span  contenteditable class="editable-span">
                ${adata}
            </span>
        </li>`);

    LocalStorageTransaction.push(perfil);
    localStorage.setItem('transaction', JSON.stringify(LocalStorageTransaction));

    nome.value = "";
    data.value = "";


    // Adiciona evento de clique ao novo botão Delete
    const deleteButton = listaa.querySelector('.delecao');
    deleteButton.addEventListener('click', handleDelete);
});

function exibirTransacoesArmazenadas() {
    let transacoesSalvas = JSON.parse(localStorage.getItem('transaction')) || [];

    // Exibindo as transações na tabela (pode ser adaptado conforme necessário)
    for (let i = 0; i < transacoesSalvas.length; i++) {
        let transacao = transacoesSalvas[i];

        // Correção para interpretar a data no formato americano (mês/dia/ano)
        let dataFormatada = transacao.content;
        let partesData = dataFormatada.split('-');
        let dataObj = new Date(partesData[0], partesData[1] - 1, partesData[2]);
        let adata = `${dataObj.getDate()}/${dataObj.getMonth() + 1}/${dataObj.getFullYear()}`;

        let lista = document.querySelector('.lista');
        lista.insertAdjacentHTML('afterbegin', `
            <li data-id="${transacao.id}">
                <span contenteditable data-id="${transacao.id}" class="editable-span">
                    ${transacao.owner}
                </span>
            </li>`);

        let listaa = document.querySelector('.listaa');
        listaa.insertAdjacentHTML('afterbegin', `
            <li data-id="${transacao.id}">         
                <span contenteditable data-id="${transacao.id}" class="editable-span">
                    ${adata}
                </span>
                <button type="button" class="delecao">Delete</button>
            </li>`);

        // Adiciona evento de clique ao botão Delete
        const deleteButton = listaa.querySelector('.delecao');
        deleteButton.addEventListener('click', handleDelete);

        //atualizar conteudo
        const attowner = lista.querySelector('.editable-span');
        attowner.addEventListener('submit', handleatualiza);
    }
}

function handleDelete(event) {
    const button = event.target;
    const listItem = button.parentNode;
    const id = listItem.getAttribute('data-id');

    // Remover do HTML
    listItem.remove();

    // Remover do Local Storage
    const updatedTransactions = LocalStorageTransaction.filter(item => item.id != id);
    localStorage.setItem('transaction', JSON.stringify(updatedTransactions));
}

//nao funciona
function handleatualiza(event) {
     // Prevent the form from actually submitting

    const editableSpan = event.target;
    const id = editableSpan.getAttribute('data-id');

    // Update the content in the Local Storage
    const updatedTransactions = LocalStorageTransaction.map(item => {
        if (item.id == id) {
            item.owner = editableSpan.textContent.trim();
        }
        return item;
    });

    localStorage.setItem('transaction', JSON.stringify(updatedTransactions));
}


