import './header.css';

export function Header() {
    return <div className="Header">
        <div><a href='/'>Flashcard App</a></div>
        <div><a href='/'>Home</a></div>
        <div><a href='/'>Create Deck</a></div>
        {/* <div style={{ float: 'right' }}><a href='/' onClick={logout}>Logout</a></div> */}
        {/* <div>{`Welcome, ${localStorage['username']}`}</div> */}
    </div>

}