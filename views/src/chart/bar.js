const template = document.createElement('template')
template.innerHTML = `
<div id="bar">
    <div id="value"></div>
    <div id="fill"></div>
    <div id="name"></div>
</div>

<style>
:host {

}
#bar {
    border: 1px solid black;
    height: 100%;
}

#fill {
    background-color: blue;
    height: 50px;
}
</style>
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
        const name = this.getAttribute('name')
        const value = this.getAttribute('value')
        const max = this.getAttribute('max')

        node.querySelector('#value').innerText = value
        // node.querySelector('#bar').innerText = max
        node.querySelector('#name').innerText = name
    }

    render() {
        let node = template.content.cloneNode(true)
        this.configure(node)
        this.root.appendChild(node)
    }
}

export default Bar