const socket = io();
const table = document.querySelector('table');
let tbody = document.querySelector('tbody');

const onNameInput = e => {
    if (e.which == 13) {
        socket.emit('updateName', {
            id: ~~e.target.name.replace(/gt\-/,''),
            name: e.target.value
        });
    }
}

const dataItem = g => html`
    <tr>
        <td>${g.id}</td>
        <td>
            <input
                type="text"
                name="gt-${g.id}"
                value="${g.name || ''}"
                placeholder="Enter word"
                onkeyup=${onNameInput}
            >
        </td>
        <td>${JSON.stringify(g.data)}</td>
        <td>${g.dateCreated.toLocaleTimeString()} on ${g.dateCreated.toLocaleDateString()}</td>
    </tr>
`

socket.on('updateState', state => {
    console.log(state);
    table.removeChild(tbody);
    tbody = html`<tbody></tbody>`;
    table.appendChild(tbody);

    for (let g of state) {
        g.dateCreated = new Date(g.dateCreated);
        tbody.appendChild(dataItem(g));
    }
});


socket.on('gesture', g => {
    console.log('gesture', g);

    g.dateCreated = new Date(g.dateCreated);

    tbody.appendChild(dataItem(g));
});