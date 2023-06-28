export default function Post({ title, URL, comment }) {
    return (
        <>
        <h1>{ title }</h1>
        <p>{ URL }</p>
        <p>{ comment }</p>
        </>
    )
}
