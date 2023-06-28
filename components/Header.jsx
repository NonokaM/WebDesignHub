import Link from "next/link"

export default function Herder() {
    return (
        <>
        <nav>
            <Link href='/'>Home</Link>
            <Link href='/create'>Create</Link>
            {/* <Link href='/search'>Search</Link> */}
            <Link href='/login'>Login</Link>
        </nav>
        </>
    )
}
