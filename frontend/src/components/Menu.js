import '../styles/Menu.css';
function Menu({ email, signOut }) {
    return (
        <div className="menu">
        <p className="menu__email">{email}</p>
        <button className="menu__button" onClick={signOut}>Выйти</button>
        </div>
    )
}

export default Menu;