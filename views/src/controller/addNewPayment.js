const template = document.createElement('template')
template.innerHTML = `
<head><span>Add New Payment</span>
<button id="closeForm">Close</button></head>

<form id="newPaymentForm">
<legend>Title</legend>
<input type="text" id="title" required>

<legend>Amount</legend>
<input type="number" id="amount" required>

<legend>Category</legend>
<select id="category" required>
<option value="">Select Category</option>
</select>

<legend>Date</legend>
<input type="date" id="date" required>
<input type="text" id="comment">

<input type="submit" id="comment" value="Create">
</form>
<style>
:host {
    display: none;
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 50%;
    top: 25%;
    width: 25%; /* Full width */
    height: 25%; /* Full height */
    background-color: white /* Fallback color */
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


        const submitButton = node.querySelector('#newPaymentForm')

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