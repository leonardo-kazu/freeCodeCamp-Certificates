export default function Toolbar(props) {


    return (
        <div className="toolbar">
            <p className="label">{props.name}</p>
            <i className={props.icons } onClick={props.onClick}></i>
        </div>

    )
}