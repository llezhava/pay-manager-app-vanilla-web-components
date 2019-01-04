const template = document.createElement('template')
template.innerHTML = `
<div id="separator"></div>
<style>
#separator {
    background-color: #d2ddeb;
    width: 1px;
    height: 100%;
    margin: 0.2em;
}
</style>
`

class Separator extends HTMLElement {
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
    }

    render() {
        let node = template.content.cloneNode(true)
        this.configure(node)
        this.root.appendChild(node)
    }
}

export default Separator