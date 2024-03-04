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
    // Добавим вывод в консоль для отслеживания
    console.log("Fetching user data for ID:", id);

    const url = `http://localhost:8080/api/admin/users/${id}`;

    try {
        const response = await fetch(url);
        const userData = await response.json();

        // Добавим вывод в консоль для отслеживания
        console.log("Fetched user data:", userData, form);


        // Заполнение формы данными пользователя
        form.id.value = userData.id;
        form.firstName.value = userData.firstName;
        form.lastName.value = userData.lastName;
        form.age.value = userData.age;
        form.email.value = userData.email;
        if (form.password) form.password.value = userData.password;

        // Отметка ролей в форме
        userData.roles.forEach(role => {
            const roleOption = form.roles.querySelector(`option[value="${role.id}"]`);
            if (roleOption) {
                roleOption.selected = true;
            }
        });

        // Открываем модальное окно
        modal.show();
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

