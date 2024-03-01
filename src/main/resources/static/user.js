const URLNavbarUser = 'http://localhost:8080/api/user/showAccount/';
const navbarUser = document.getElementById('navbarUser');
const tableUserUser = document.getElementById('tableUser');

function getCurrentUser() {
    fetch(URLNavbarUser)
        .then((res) => res.json())
        .then((person) => {

            let rolesStringUser = rolesToStringForUser(person.roles);
            let dataOfUser = '';

            dataOfUser += `<tr>
            <td>${person.id}</td>
            <td>${person.firstName}</td>
            <td>${person.lastName}</td>
            <td>${person.age}</td>
            <td>${person.email}</td>
            <td>${rolesStringUser}</td>
            </tr>`;
            tableUserUser.innerHTML = dataOfUser;
            navbarUser.innerHTML = `<b><span>${person.email}</span></b>
                             <span>with roles:</span>
                             <span>${rolesStringUser}</span>`;
        });
}

getCurrentUser()

function rolesToStringForUser(roles) {
    if (!Array.isArray(roles)) {
        console.error('roles is not an array:', roles);
        return 'Invalid roles data';
    }

    let rolesString = '';
    for (let element of roles) {
        if (!element.nameOfRole) {
            console.error('nameOfRole is missing in roles element:', element);
            continue;
        }
        rolesString += (element.nameOfRole.toString().replace('ROLE_', '') + ', ');
    }
    rolesString = rolesString.substring(0, rolesString.length - 2);
    return rolesString;
}