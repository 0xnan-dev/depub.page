import Quill from 'quill'
import 'quill//dist/quill.core.css'
import 'quill//dist/quill.snow.css'
import { FC, useEffect, useRef, } from 'react'
import converter from "../../../utils/showdown";

const quillOption = {
    // debug: 'info',
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'link'],
      ]
    },
    placeholder: 'Create your decentralize page',
    theme: 'snow'
}

const QuillEditor: FC<{
    value?: string,
    onChange: (val: string) => void,
}> = ({ value, onChange, }) => {
    const el = useRef(null)
    let editor = useRef<Quill|null>(null)
    useEffect(() => {
        if (el.current && !editor.current) {
            const quill = new Quill(el.current, quillOption)
            quill.on('text-change', onTextChange)
            editor.current = quill
        }
    }, [el])

    function onTextChange(delta: any) {
        // console.log(delta)
        if (editor.current) {
            const htmlContent = editor.current.root.innerHTML
            const content = converter.makeMarkdown(htmlContent).replaceAll('<br>', '\n')
            onChange(content)
        }
    }

    return (
        <div>
            <div ref={el} style={{height: '300px'}}></div>
        </div>

    )
}


export default QuillEditor