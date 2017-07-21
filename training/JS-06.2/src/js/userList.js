import * as _ from 'lodash';
import * as ava from '../img/ava.png';

export default function userList(users) {
    const container = document.getElementById('root');
    const sortedUsers = _.sortBy(users, 'age');
    return function showList() {
        sortedUsers.forEach((user) => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = ava.default;
            img.classList.add('user__ava');
            div.appendChild(img);
            div.append(`${user.name} ${user.age}`);
            container.appendChild(div);
        });
    };
}
