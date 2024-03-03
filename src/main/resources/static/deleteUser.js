let formDelete = document.forms["formDelete"];

deleteUser();

async function deleteModal(id) {
    const modalDelete = new bootstrap.Modal(document.querySelector('#deleteModal'));
    await open_fill_modal(formDelete, modalDelete, id);
    loadRolesForDelete();
}

function deleteUser() {
    formDelete.addEventListener("submit", async ev => {
        ev.preventDefault();
        try {
            const userId = formDelete.querySelector("#delete-id").value;
            await fetch("http://localhost:8080/api/admin/users/" + userId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            $('#deleteClose').click();
            getAllUsers();
        } catch (error) {
            console.error(error);
        }
    });
}
//
// async function open_fill_modal(form, modal, id) {
//     try {
//         const response = await fetch("http://localhost:8080/api/admin/users/" + id);
//         const user = await response.json();
//
//         form.querySelector("#delete-id").value = user.id;
//         form.querySelector("#delete-name").value = user.firstName;
//         form.querySelector("#delete-lastname").value = user.lastName;
//         form.querySelector("#delete-age").value = user.age;
//         form.querySelector("#delete-username").value = user.username;
//         form.querySelector("#delete-roles").value = user.roles.map(role => role.nameOfRole).join(',');
//
//         modal.show();
//     } catch (error) {
//     }
// }

function loadRolesForDelete() {
    let selectDelete = document.getElementById("delete-roles");
    selectDelete.innerHTML = "";

    fetch("http://localhost:8080/api/admin/roles")
        .then(res => res.json())
        .then(data => {
            data.forEach(role => {
                let option = document.createElement("option");
                option.value = role.id;
                option.text = role.nameOfRole.replace('ROLE_', '');
                selectDelete.appendChild(option);
            });
        })
}

window.addEventListener("load", loadRolesForDelete);
