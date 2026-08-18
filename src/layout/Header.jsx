import { NavLink } from "react-router-dom"
export default function Header(){
    return(
      <nav className="navbar navbar-expand-lg bg-secondary">
  <div className="container-fluid">
    <NavLink to={"/"} className="navbar-brand" >Progetto Finale</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to={"/"} className="nav-link" href="#">HomePage</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/compare"} className="nav-link" href="#">Comapare</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/favorite"} className="nav-link" href="#">WishList</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
    )
}