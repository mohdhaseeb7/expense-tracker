const expenseForm = document.getElementById('expense-form')
const messageBox = document.getElementById('message-box')
const totalAmountDisplay = document.querySelector('[id = "amount-display"')

const expenseListDisplay = document.getElementById('expense-list')

let expenseList = JSON.parse(localStorage.getItem('expense-list')) || []

expenseForm.addEventListener('submit', addExpense)
renderExpenses()
expenseForm.addEventListener('change', () => messageBox.classList.add('hidden'))

expenseListDisplay.addEventListener('click', deleteExpense)

function deleteExpense(event) {
    event.preventDefault()
    if (event.target.tagName != 'BUTTON') return
    // console.log(event.target.id);

    const id = event.target.id
    console.log(event.target);

    expenseList = expenseList.filter((exp) => exp.id != id)

    saveExpenses()
    renderExpenses()
}

function addExpense(event) {
    event.preventDefault()
    const formData = new FormData(expenseForm)

    const expense = {
        id: Date.now(),
        expenseName: formData.get('expensename'),
        amount: formData.get('amount'),
        date: formData.get('date')
    }
    // console.log(expense);
    expenseList.push(expense)
    expenseForm.reset()
    saveExpenses()
    renderExpenses()
}

function saveExpenses() {
    localStorage.setItem('expense-list', JSON.stringify(expenseList))
}

function renderExpenses() {
    let totalAmount = 0

    expenseListDisplay.innerHTML = ''
    console.log('from render expense:', expenseList);
    
    expenseList.forEach(expense => {
        totalAmount = totalAmount + parseFloat(expense.amount)
        const li = document.createElement('li')

        li.innerHTML = `
                <div>
                <strong>${expense.expenseName}</strong>
                <small>${new Date(expense.date).toLocaleDateString()}</small>
                </div>
                <span>${expense.amount}</span>
                <button id = "${expense.id}">Delete</button>`
                expenseListDisplay.append(li)
            });
            totalAmountDisplay.textContent = totalAmount
}

function showMessage(message) {
    messageBox.classList.remove('hidden')
    messageBox.innerText = message
}
