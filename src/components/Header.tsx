import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
  <div className="header">
    <Link to="/" viewTransition= {{ types: ["backward"] }}>__root</Link>
    <h2 className="right">ɛˈseɪ</h2>
  </div>
  )
}
