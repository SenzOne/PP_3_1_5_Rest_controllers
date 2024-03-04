let formEdit = document.forms["formEdit"];
const buttonSubmit = formEdit.querySelector('button[type="submit"]');

editUser();
console.log({formEdit, buttonSubmit});

const URLEdit = "http://localhost:8080/api/admin/users/";

async function editModal(id) {
    console.log("Edit Modal");
    const modalEdit = new bootstrap.Modal(document.querySelector('#editModal'));
    await open_fill_modal(formEdit, modalEdit, id);
    await loadRolesForEdit();
}

function editUser() {
    console.log("Edit User");
    buttonSubmit.addEventListener("click", ev => {
        ev.preventDefault();

        console.log("Edit form submitted!");
        let rolesForEdit = [];
        for (let i = 0; i < formEdit.roles.options.length; i++) {
            if (formEdit.roles.options[i].selected) rolesForEdit.push({
                id: formEdit.roles.options[i].value,
                role: "ROLE_" + formEdit.roles.options[i].text
            });
        }

        let requestBody = {
            id: formEdit.id.value,
            firstName: formEdit.firstName.value,
            lastName: formEdit.lastName.value,
            age: formEdit.age.value,
            email: formEdit.email.value,
            password: formEdit.password.value,
            roles: rolesForEdit
        };

        console.log("Submitting edit form with data:", requestBody);

        fetch(URLEdit + formEdit.id.value, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: formEdit.id.value,
                firstName: formEdit.firstName.value,
                lastName: formEdit.lastName.value,
                age: formEdit.age.value,
                email: formEdit.email.value,
                password: formEdit.password.value,
                roles: rolesForEdit
            })
        }).then(() => {
            $('#editClose').click();
            getAllUsers();
        });
    });
}

function loadRolesForEdit() {
    let selectEdit = document.getElementById("edit-roles");
    selectEdit.innerHTML = "";

    fetch("http://localhost:8080/api/admin/roles")
        .then(res => res.json())
        .then(data => {
            data.forEach(role => {
                let option = document.createElement("option");
                option.value = role.id;
                option.text = role.nameOfRole.replace('ROLE_', '');
                selectEdit.appendChild(option);
            });
        })

}

window.addEventListener("load", loadRolesForEdit);

