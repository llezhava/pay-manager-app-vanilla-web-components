const template = document.createElement('template')
template.innerHTML = `
<section id="filters">
    <section id="byCategory">
         <h2>Filter By Category</h2>
         <select id="category" multiple="yes">
            <option value="">Select Category</option>
        </select>
</section>
<paym-separator></paym-separator>
<section id="byDate">
    <h2>Filter By Date</h2>
    <input type="date" id="fromDate" placeholder="from">
    <input type="date" id="toDate" placeholder="to">
</section>
<paym-separator></paym-separator>
<section id="byAmount">
    <h2>Filter by Amount</h2>
    <input type="number" id="fromAmount" placeholder="from">
    <input type="number" id="toAmount" placeholder="to">
</section>
</section>
<style>
:host {
    display: none
}

#filters {
    display: flex;
    justify-content: space-between;
    background-color: white;
    padding: 0.5em;
    margin-top: 2em;
}

#byDate, #byAmount {
    display: flex;
    flex-direction: column;
}
</style>
`

class ExtendedFilters extends HTMLElement {
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
                    let categories = this.root.querySelector('#category')
                    if (categories === null) break;
                    this.addCategories(categories)
                    break;
                }
                default: break;
        }
    }

    getFilterValues() {
        const filters = {
            category: this.root.querySelector('#category').value,
            startDate: this.root.querySelector('#fromDate').valueAsDate,
            endDate: this.root.querySelector('#toDate').valueAsDate,
            fromAmount: this.root.querySelector('#fromAmount').value,
            toAmount: this.root.querySelector('#toAmount').value
        }

        return filters
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
        const category = node.querySelector('#category')
        this.addCategories(category)
        const fromDate = node.querySelector('#fromDate')
        const toDate = node.querySelector('#toDate')
        const fromAmount = node.querySelector('#fromAmount')
        const toAmount = node.querySelector('#toAmount')

        const inputs = [category, fromDate, toDate, fromAmount, toAmount]

        inputs.forEach(input => {
            input.addEventListener('change', e => {
                let filters = this.getFilterValues()
                this.dispatchEvent(new CustomEvent('newFilters', {
                    detail: filters
                }))
            })
        })
    }

    render() {
        let node = template.content.cloneNode(true)
        this.configure(node)
        this.root.appendChild(node)
    }
}


export default ExtendedFilters