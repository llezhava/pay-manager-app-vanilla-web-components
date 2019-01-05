const template = document.createElement('template');
template.innerHTML = `
<section id="record">
    <div id="title" class="title">Title</div>
    <paym-tag id="category"></paym-tag>
    <div id="paidOn">Current Date</div>
    <div id="amount">Current Date</div>
    <div id="comment-section">
         <div class="title">Comment</div>
         <span id="comment">Comment</span>
    </div>
</section>
<style>

#record {
    color: #45617e;
    margin: 1em;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto auto;
    grid-gap: 1em;
    grid-template-areas: 
    "title date"
    "category amount"
    "comment comment"
}

#title {
    font-size: 1.5em;
    grid-area: title;
    justify-self: start;
}

#category {
    grid-area: category;
    justify-self: start;
}

#paidOn {
    grid-area: date;
    justify-self: end;
}

#amount {
    grid-area: amount;
    justify-self: end
}

#comment-section {
    font-size: 1em;
    grid-area: comment;
}

.title {
    font-weight: bold;
}

</style>
`


// TODO: Add expanded state here.
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

        node.querySelector('#title').innerText = title
        node.querySelector('#amount').innerText = amount
        node.querySelector('#category').setAttribute('text', category)
        node.querySelector('#paidOn').innerText = date
        node.querySelector('#comment').innerText = comment

        this.root.appendChild(node)
    }
}

export default Record