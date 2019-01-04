const template = document.createElement('template')
template.innerHTML = `
<div class="light" id="tag">
    <section id="text"></section>
</div>
<style>
:host {

}

div {
    color: #a1c4ff;
    border: 0.1em solid #a1c4ff;
    border-radius: 1.3em;
    padding: 0.5em;
    margin: 0.5em;
    display: flex;
    justify-content: center;
}

.light {

}

.fillBlue {
    background-color: #a1c4ff;
    color: #FFFFFF
}

.fillGrey {

}

</style>
`

class Tag extends HTMLElement {
    constructor() {
        super()
        this.root = this.attachShadow({
            'mode': 'open'
        });
    }

    static get observedAttributes() {
        return ['theme', 'text'];
    }


    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'theme':
                {
                    let tag = this.root.querySelector('#tag')
                    tag.setAttribute('class', name)
                    break;
                }
            case 'text':
                {
                    let text = this.root.querySelector('#text')
                    text.textContent = name;
                    break;
                }
            default:
                break;
        }
    }

    connectedCallback() {
        this.render()
    }

    configure(node) {
        let value = this.getAttribute('value')
        let text = this.getAttribute('text')
        let theme = this.getAttribute('theme')
        console.log(node)

        let tag = node.querySelector('#tag')
        let textNode = node.querySelector('#text')
        tag.setAttribute('class', theme)
        textNode.textContent = text

        console.log(node)
    }

    render() {
        let node = template.content.cloneNode(true)
        this.configure(node)
        this.root.appendChild(node)
    }
}

export default Tag