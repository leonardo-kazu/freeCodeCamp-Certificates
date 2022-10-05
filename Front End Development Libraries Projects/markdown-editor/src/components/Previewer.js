import { useSelector } from "react-redux"
import { getText } from "../slices/editorSlice"
import {marked} from 'marked'

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

export default function Previewer() {
    let text = useSelector(getText)
    
    return (
        <div id="preview" className="maxmin previewer" dangerouslySetInnerHTML={{__html: marked(text, {renderer: renderer})}}></div>
    )
}