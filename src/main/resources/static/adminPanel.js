function parseUsers(usersArray) {
    let result = '';

    usersArray.forEach(user => {
        result += `User ID: ${user.id}\n`;
        result += `Name: ${user.firstName} ${user.lastName}\n`;
        result += `Age: ${user.age}\n`;
        result += `Email: ${user.email}\n`;
        result += `Roles: `;

        // Concatenate roles
        user.roles.forEach(role => {
            result += `${role.nameOfRole} `;
        });

        result += '\n\n';
    });

    return result;
}

// Выполняем запрос к API
fetch('http://localhost:8080/api/allUsers')
    .then(response => response.json())
    .then(data => {
        // Парсим и отображаем данные
        const parsedData = parseUsers(data);
        document.getElementById('parsedData').textContent = parsedData;
    })
    .catch(error => console.error('Error fetching data:', error));
