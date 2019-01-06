const template = document.createElement('template')
template.innerHTML = `
<div id="head">
    <div>add new payment</div>
    <button id="closeForm">Close</button>
</div>

<section id="addNewPayment">
<form id="newPaymentForm">
    <div class="title">
        <legend>Title</legend>
        <input type="text" id="title" required>
    </div>

    <div class="amount">
        <legend>Amount</legend>
        <input type="number" id="amount" required>
    </div>

    <div class="category">
        <legend>Category</legend>
        <select id="category" required>
        <option value="">Select Category</option>
        </select>
    </div>

    <div class="date">
        <legend>Date</legend>
        <input type="date" id="date" required>
    </div>

    <div class="comment">
        <legend>Comment</legend>
        <input type="text" id="comment">
    </div>
    <div class="submit">
        <input type="submit" id="submit-button" value="Create">
    </div>

</form>
</section>

<style>
:host {
    display: none;
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 50%;
    top: 20%;
    width: 25em; /* Full width */
    height: 30em; /* Full height */
    background-color: white /* Fallback color */
}

#addNewPayment {
    padding: 2em;
    background-color: #097500;
    color: #a1c4ff;
    display: flex;
    flex-direction: column;
}

#newPaymentForm {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 1em;
    grid-template-areas:
    "title title amount"
    "category category category"
    "date date date"
    "comment comment comment"
    ". . submit";
}

.title {
    grid-area: title;
}

.amount {
    grid-area: amount;
}

.category {
    grid-area: category;
}

.date {
    grid-area: date;
}

.comment {
    grid-area: comment;
}

.submit {
    grid-area: submit;
}

#head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: black;
    text-transform: uppercase;
}


input, select {
    box-sizing: border-box;
    height: 3em;
    font-size: 1.2em;
    text-align: center;
    color: #a1c4ff;
    width: 100%;
}


#submit-button {
    background-color: #a1c4ff;
    color: #FFFFFF;
    padding: 0.5em;
}
</style>
`

class AddNewPayment extends HTMLElement {
    constructor() {
        super()
        this.root = this.attachShadow({
            'mode': 'open'
        });
    }

    static get observedAttributes() {
        return ['categories'];
    }

    connectedCallback() {
        this.render()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'categories':
                {
                    let categories = this.root.querySelector('select')
                    if (categories === null) break;
                    this.addCategories(categories)
                    break;
                }
        }
    }

    addCategories(selectNode) {
        const categories = JSON.parse(this.getAttribute('categories'))

        if (categories !== null) {

            // Remove existing categories
            while (selectNode.firstChild) {
                selectNode.removeChild(selectNode.firstChild)
            }

            let emptyValue = document.createElement('option')
            emptyValue.setAttribute('value', '')
            emptyValue.innerText = 'Select Category'
            selectNode.appendChild(emptyValue)

            categories.forEach(cat => {
                let option = document.createElement('option')
                option.setAttribute('value', cat.id)
                option.innerText = cat.name
                selectNode.appendChild(option)
            })
        }
    }

    configure(node) {
        const closeButton = node.querySelector('#closeForm')

        closeButton.addEventListener('click', e => {
            this.style.display = 'none'
        })

        const categoriesNode = node.querySelector('select')

        this.addCategories(categoriesNode)


        const submitButton = node.querySelector('#submit-button')

        submitButton.addEventListener('submit', e => {
            e.preventDefault()

            let formData = {
                title: e.target['title'].value,
                amount: e.target['amount'].value,
                category: e.target['category'].value,
                date: e.target['date'].value,
                comment: e.target['comment'].value
            }

            this.dispatchEvent(new CustomEvent('addPayment', {
                detail: formData
            }))
        })

    }

    render() {
        let node = template.content.cloneNode(true)
        this.configure(node)
        this.root.appendChild(node)
    }
}


export default AddNewPayment