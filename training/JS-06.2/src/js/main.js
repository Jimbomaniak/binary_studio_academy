import userList from './userList';
import '../css/style.scss';

const users = [
    {name: 'Berezhnoy', age: guessAge()},
    {name: 'Tovmach', age: guessAge()},
    {name: 'Rapova', age: guessAge()},
    {name: 'Akimov', age: guessAge()},
    {name: 'Kukuruza', age: guessAge()},
    {name: 'Manukyan', age: guessAge()},
    {name: 'Kuts', age: guessAge()},
    {name: 'Satskyi', age: guessAge()},
    {name: 'Dolynskyi', age: guessAge()}
];

let showList = userList(users);
showList();

function guessAge() { // just flexing around...
    return Math.floor(Math.random() * (50 - 19) + 19);
}