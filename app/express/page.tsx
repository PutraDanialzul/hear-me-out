import Link from "next/link";

export default function ExpressPage(){
    return (<div>
        <h1>Expressions: </h1><Link className="addButton" href="/express/add">+ Add an expression</Link>
    </div>);
}