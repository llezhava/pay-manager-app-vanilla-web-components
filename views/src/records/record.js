const template = document.createElement('template');
template.innerHTML = `
<section id="record">
    <h1>Title</h1>
    <span id="category">Gasoline</span>
    <span id="paidOn">Current Date</span>
    <span id="amount">Current Date</span>
    <span id="comment">Comment</span>
</section>`

class Record extends HTMLElement {
    constructor() {
        super()
        this.root = this.attachShadow({
            'mode': 'open'
        });
    }



    connectedCallback() {
        this.render()
    }

    render() {
        let node = template.content.cloneNode(true)

        const title = this.getAttribute('title')
        const amount = this.getAttribute('amount')
        const category = this.getAttribute('category')
        const date = this.getAttribute('date')
        const comment = this.getAttribute('comment')

        node.querySelector('h1').innerText = title
        node.querySelector('#amount').innerText = amount
        node.querySelector('#category').innerText = category
        node.querySelector('#paidOn').innerText = date
        node.querySelector('#comment').innerText = comment

        this.root.appendChild(node)
    }
}

export default Record