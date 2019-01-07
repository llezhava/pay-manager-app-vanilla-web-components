const template = document.createElement('template')
template.innerHTML = `
<section id="filters">
    <section id="byCategory">
         <div class="title">Filter by category</div>
         <section id="categories"></section>
    </section>
    <section id="byDate">
        <div class="title">Filter by date</div>
        <input type="date" id="fromDate" placeholder="from">
        <input type="date" id="toDate" placeholder="to">
    </section>
    <section id="byAmount">
        <div class="title">Filter by amount</div>
        <input type="text" id="fromAmount" placeholder="from">
        <input type="text" id="toAmount" placeholder="to">
    </section>
</section>
<style>
:host {
    display: none;
}

#filters {
    display: flex;
    justify-content: space-between;
    background-color: white;
    color: #9ba5b2;
    margin-top: 2em;
    padding: 1em;
}

.title {
    font-size: 1em;
    margin: 0.2em;
}

#byCategory {
    border-left: 1px solid #d2ddeb;
    padding-left: 1em;
}

#categories {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

#byDate {

}

#byDate, #byAmount {
    flex-basis: 20%;
    border-left: 1px solid #d2ddeb;
    padding-left: 1em;
    display: flex;
    flex-direction: column;
}

input {
    font-family:inherit;
    color: #9ba5b2;
    margin: 0.5em;
    padding: 0.5em;
    border: 1px solid #bec2da;
    border-radius: 0.2em;
    width: 85%;
}

paym-tag {
    margin: 0.5em;
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
            fromDate: this.root.querySelector('#fromDate').valueAsDate,
            toDate: this.root.querySelector('#toDate').valueAsDate,
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
            input.addEventListener('focusout', e => {
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