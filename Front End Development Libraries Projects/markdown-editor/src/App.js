import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Editor from "./components/Editor"
import Previewer from "./components/Previewer"
import Toolbar from "./components/Toolbar"
import { getEditorMaximized, getPreviewerMaximized, handleEditorMaximized, handlePreviewMaximized } from "./slices/editorSlice";
import './App.css'

function App() {
  let editorMaximized = useSelector(getEditorMaximized);
  let previewerMaximized = useSelector(getPreviewerMaximized);
  const dispatch = useDispatch()

  const classes = editorMaximized ? ["maximized ", 'minimized ', "bi bi-fullscreen-exit"]
  : previewerMaximized ? ["minimized ", 'maximized ', 'bi bi-fullscreen-exit']
  : ['','',"bi bi-arrows-fullscreen"]
  return (
    <React.Fragment>
      <div className="container">
        <div className={classes[0] + 'flex area'}>
          <Toolbar  name="Editor" icons={classes[2]} onClick={(e) => dispatch(handleEditorMaximized(e))}></Toolbar>
          <Editor id='editor'></Editor>
        </div>
        <div className={classes[1] + "flex area"}>
          <Toolbar name="Previewer" icons={classes[2]} onClick={(e) => dispatch(handlePreviewMaximized(e))}></Toolbar>
          <Previewer ></Previewer>
        </div>
      </div>
    </React.Fragment>
  )
}

export default App;
