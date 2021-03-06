const template = document.createElement('template')
import add from '../../img/add.png'
import search from '../../img/search.png'
template.innerHTML = `
<section id="controller">
        <div id="addPayment"><img src="${add}"><div>add payment</div></div>
        <div id="any-filter">
            <img src="${search}">
            <input type="text" id="anyFilter" placeholder="Filter by any property">
         </div>
        <div id="extended-filters-button">
            <paym-tag id="showExtendedFilters" theme="fillGrey" text="extended filters"></paym-tag>
        </div>
</section>

<paym-extended-filters></paym-extended-filters>
<paym-add-payment></paym-add-payment>
<style>

paym-separator {
    height: 3em;
}

#controller {
    background-color: white;
    padding: 1em;
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-template-areas: "add-payment . any-filter extended-filters-button";
    place-items: center;
}

#addPayment {
    grid-area: add-payment;
    justify-self: start;
    height: 2em;
    padding: 1em;
    border-left: 1px solid #d2ddeb;
    color: #a1c4ff;
    text-transform: uppercase;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: default;
}

#addPayment:hover {
    color: #779cdb;
}

#addPayment img {
    margin-right: 0.3em;
}


#any-filter {
    grid-area: any-filter;
    justify-self: end;
    height: 2em;
    padding: 1em;
    border-left: 1px solid #d2ddeb;
    display: flex;
    flex-direction: row;
    align-items: center;
}

#any-filter input {
    border: none;
}

#any-filter img {
    margin-right: 0.3em;
}

#extended-filters-button {
    grid-area: extended-filters-button;
    justify-self: end;
    height: 2em;
    padding: 1em;
    border-left: 1px solid #d2ddeb;
    display: flex;
    align-items: center;
}

.any-filter input {
    font-family: inherit;
}

</style>
`

import AddNewPayment from './addNewPayment'
import ExtendedFilters from './extendedFilter'

window.customElements.define('paym-add-payment', AddNewPayment)
window.customElements.define('paym-extended-filters', ExtendedFilters)



class Controller extends HTMLElement {
    constructor() {
        super();
        this.filters = {}
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
                    let extendedFilters = this.root.querySelector('paym-extended-filters')
                    let addPayment = this.root.querySelector('paym-add-payment')
                    if (extendedFilters === null) break;
                    extendedFilters.setAttribute('categories', newValue)
                    addPayment.setAttribute('categories', newValue)
                    break;
                }
        }
    }


    configure(node) {
        this.configureFilters(node)
        this.configureAdd(node)
    }

    configureAdd(node) {
        const addPayment = node.querySelector('paym-add-payment')

        if (addPayment === null) return

        const addButton = node.querySelector('#addPayment')

        addPayment.setAttribute('categories', this.getAttribute('categories'))

        addPayment.addEventListener('addPayment', e => {
            let {
                detail
            } = e
            this.dispatchEvent(new CustomEvent('addPayment', {
                detail
            }))
        })


        addButton.addEventListener('click', e => {
            addPayment.style.display = 'block'
        })
    }

    configureFilters(node) {
        let anyFilter = node.querySelector('#anyFilter')

        anyFilter.addEventListener('change', e => {
            this.filters = Object.assign({}, this.filters, {
                any: e.target.value
            })
            this.dispatchEvent(new CustomEvent('newFilters', {
                detail: this.filters
            }))
        })

        let showExtendedFilters = node.querySelector('#showExtendedFilters')

        showExtendedFilters.addEventListener('click', e => {
            let currentDisplay = this.root.querySelector('paym-extended-filters').style.display

            if (currentDisplay !== 'block') {
                this.root.querySelector('paym-extended-filters').style.display = 'block'
            } else {
                this.root.querySelector('paym-extended-filters').style.display = 'none'
            }
        })

        let extendedFilter = node.querySelector('paym-extended-filters')

        extendedFilter.setAttribute('categories', this.getAttribute('categories'))

        extendedFilter.addEventListener('newFilters', e => {
            let {
                detail
            } = e

            this.filters = Object.assign({}, this.filters, detail)

            this.dispatchEvent(new CustomEvent('newFilters', {
                detail: this.filters
            }))
        })
    }


    render() {
        let node = template.content.cloneNode(true)
        this.configure(node)
        this.root.appendChild(node)
    }

}

export default Controller