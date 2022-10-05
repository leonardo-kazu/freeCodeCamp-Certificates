import { useDispatch, useSelector } from "react-redux";
import { getText, setNormalText,  } from "../slices/editorSlice";
import "./index.css"

export default function Editor() {
    const text = useSelector(getText);
    const dispatch = useDispatch()
    

    return (
        <div>
            <textarea 
                id="editor"
                // Usamos o e para relacionar o evento ao dispatch, assim conseguimos passar o valor
                onChange={(e) => dispatch(setNormalText(e.target.value))}
                type="text"
                value={text}
                className="maxmin"
            />
        </div>
    )
}