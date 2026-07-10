import Link from "next/link";
import ExpressionList from "../../components/expression-list";
import RemoveLocalStorage from "../../components/remove-local-storage";

export default async function ExpressPage({searchParams}:{searchParams:Promise<{error:string, error_description:string}>}){
    let banner = (null);
    const error = (await searchParams).error;
    const errorDesc = (await searchParams).error_description;
    if(error)
        banner = (
            <div className="errorBanner">
                <p>{"Error: "+error}</p>
            </div>
        );
    return (<div>
        <RemoveLocalStorage storageKey="expressionDraft"/>
        <h1>Expressions: (Private)</h1>
        <Link className="addButton" href="/express/add">+ Add an expression</Link>
        <ExpressionList/>
    </div>);
}