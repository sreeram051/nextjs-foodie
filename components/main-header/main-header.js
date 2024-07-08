import Link from 'next/link'
import logoimg from "@/assets/logo.png"
import classess from './main-header.module.css'
import Image from 'next/image'
import NavLink from './nav-links'

export default function MainHeader() {
    return (
        <header className={classess.header}>
            <Link href='/' className={classess.logo}>
            <Image src={logoimg} alt='logo' priority />
             NextLevel Food
            </Link>
        <nav className={classess.nav}>
            <ul>
                <li>
                    <NavLink herf='/meals'>Browse Meals</NavLink>
                </li>
                <li>
                    <NavLink herf='/community'>Foodies Community</NavLink>
                </li>
            </ul>
        </nav>
        </header>
    )    
}