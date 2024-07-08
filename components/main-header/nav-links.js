"use client"


import { usePathname } from "next/navigation";
import Link from "next/link";
import classes from './nav-link.module.css'


export default function NavLink({ herf , children }) {
    const pathname = usePathname();
    return (
        <Link href={herf} className={pathname.startsWith(herf) ? `${classes.link} ${classes.active}` :  classes.link}>
        {children}
        </Link>
    ) 

}