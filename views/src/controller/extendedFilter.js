const template = document.createElement('template')
template.innerHTML = `
<h2>Extended Filters</h2>
<section id="byCategory">
    <legend>Filter By Category</legend>
    <select id="category" multiple="yes">
        <option value="">Select Category</option>
    </select>
</section>
<section id="byDate">
    <legend>Filter By Date</legend>
    <input type="date" id="fromDate">
    <input type="date" id="toDate">
</section>
<section id="byAmount">
    <legend> Filter by Amount</legend>
    <input type="number" id="fromAmount">
    <input type="number" id="toAmount">
</section>
<style>
:host {
    display: none
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


    connectedCallback() {
        this.render()
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

    addCategories(node) {
        const select = node.querySelector('#category')
        const categories = JSON.parse(this.getAttribute('categories'))

        if (categories === null) return
        else {}

        select.innerHTML = ``

        return Object.keys(categories).map(key => {
            let option = document.createElement('option')
            option.setAttribute('value', categories[key])
            option.innerText = categories[key]
            select.appendChild(option)
            return option
        })
    }

    configure(node) {
        this.addCategories(node)
        const category = node.querySelector('#category')
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