const template = document.createElement('template')
template.innerHTML = `
<section id="filters">
    <section id="byCategory">
         <h2>Filter By Category</h2>
         <section id="categories"></section>
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

#categories {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

#byDate, #byAmount {
    width: 25%
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
                    let categories = this.root.querySelector('#categories')
                    console.log('Categories', categories, this.root, this.root.firstChild)
                    if (categories === null) break;
                    this.addCategories(categories)
                    break;
                }
            default:
                break;
        }
    }

    getFilterValues() {
        let category = this.root.querySelector('#categories')
        let categoryNodes = category.querySelectorAll('paym-tag')
        let categories = []

        for (let i = 0; i < categoryNodes.length; i++) {
            let tag = categoryNodes[i]

            let isSelected = tag.getAttribute('isSelected') === 'true'

            if (isSelected) {
                categories.push(tag.getAttribute('value'))
            }
        }
        const filters = {
            categories,
            startDate: this.root.querySelector('#fromDate').valueAsDate,
            endDate: this.root.querySelector('#toDate').valueAsDate,
            fromAmount: this.root.querySelector('#fromAmount').value,
            toAmount: this.root.querySelector('#toAmount').value
        }

        return filters
    }

    addCategories(selectNode) {
        const categories = JSON.parse(this.getAttribute('categories'))
        console.log('Adding categories!', categories)

        if (categories !== null) {

            // Remove existing categories
            while (selectNode.firstChild) {
                selectNode.removeChild(selectNode.firstChild)
            }

            categories.forEach(cat => {
                let tag = document.createElement('paym-tag')
                tag.setAttribute('value', cat.id)
                tag.setAttribute('text', cat.name)
                tag.setAttribute('theme', 'light')
                tag.setAttribute('isSelected', 'false')

                tag.addEventListener('click', e => {
                    let tag = e.target

                    let isSelected = tag.getAttribute('isSelected') === 'true'

                    if (isSelected) {
                        tag.setAttribute('isSelected', 'false')
                        tag.setAttribute('theme', 'light')
                    } else {
                        tag.setAttribute('isSelected', 'true')
                        tag.setAttribute('theme', 'fillBlue')
                    }

                    let filters = this.getFilterValues()
                    
                    this.dispatchEvent(new CustomEvent('newFilters', {
                        detail: filters
                    }))
                })
                selectNode.appendChild(tag)
            })
        }
    }

    configure(node) {
        const categories = node.querySelector('#categories')
        this.addCategories(categories)
        const fromDate = node.querySelector('#fromDate')
        const toDate = node.querySelector('#toDate')
        const fromAmount = node.querySelector('#fromAmount')
        const toAmount = node.querySelector('#toAmount')

        const inputs = [fromDate, toDate, fromAmount, toAmount]

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