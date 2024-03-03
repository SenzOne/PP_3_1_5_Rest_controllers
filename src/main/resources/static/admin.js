const URL = 'http://localhost:8080/api/admin/showAccount/';
const navbarAdmin = document.getElementById('navbarAdmin');
const tableUserAdmin = document.getElementById('tableAdmin');

function getCurrentAdmin() {
    fetch(URL)
        .then((res) => res.json())
        .then((userAdmin) => {

            let rolesStringAdmin = rolesToStringForAdmin(userAdmin.roles);
            let data = '';

            data += `<tr>
            <td>${userAdmin.id}</td>
            <td>${userAdmin.firstName}</td>
            <td>${userAdmin.lastName}</td>
            <td>${userAdmin.age}</td>
            <td>${userAdmin.email}</td>
            <td>${rolesStringAdmin}</td>
            </tr>`;
            tableUserAdmin.innerHTML = data;
            navbarAdmin.innerHTML = `<b><span>${userAdmin.email}</span></b>
                             <span>with roles:</span>
                             <span>${rolesStringAdmin}</span>`;
        });
}

getCurrentAdmin()

function rolesToStringForAdmin(roles) {
    let rolesString = '';

    for (const element of roles) {
        rolesString += (element.nameOfRole.replace('ROLE_', '') + ' ');
    }
    // rolesString = rolesString.substring(0, rolesString.length - 2);
    return rolesString;
}


async function getUserById(id) {
    let response = await fetch("http://localhost:8080/api/admin/users/" + id);
    return await response.json();
}

async function open_fill_modal(form, modal, id) {
    modal.show();
    let person = await getUserById(id);

    if (!person) {
        console.error("User information is undefined or not retrieved properly.");
        return;
    }

    form.id.value = person.id;
    form.firstName.value = person.firstName;
    form.lastName.value = person.lastName;
    form.age.value = person.age;
    form.email.value = person.email;
    form.password.value = person.password;

    let rolesSelect = form.roles;
    rolesSelect.innerHTML = "";

    for (const role of person.roles) {
        let option = document.createElement("option");
        option.text = role.nameOfRole.replace('ROLE_', '') + ' ';
        rolesSelect.add(option);
    }
}
