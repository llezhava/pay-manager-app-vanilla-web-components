const template = document.createElement('template')
template.innerHTML = `
<div id="value"></div>
<div id="bar"></div>
<div id="name"></div>
`

class Bar extends HTMLElement {
    constructor() {
        super()
        this.root = this.attachShadow({
            'mode': 'open'
        });
    }


    connectedCallback() {
        this.render()
    }

    configure(node) {
        const value = this.getAttribute('value')
        const max = this.getAttribute('max')
        const name = this.getAttribute('name')

        node.querySelector('#value').innerText = value
        node.querySelector('#bar').innerText = max
        node.querySelector('#name').innerText = name
    }

    render() {
        let node = template.content.cloneNode(true)
        this.configure(node)
        this.root.appendChild(node)
    }
}

export default Bar