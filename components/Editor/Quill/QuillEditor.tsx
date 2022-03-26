import Quill from 'quill'
import 'quill//dist/quill.core.css'
import 'quill//dist/quill.snow.css'
import { FC, useEffect, useRef, } from 'react'
import markdownToDelta from "markdown-to-quill-delta";
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
    disabled?: boolean,
}> = ({ value, onChange, disabled, }) => {
    const el = useRef(null)
    let editor = useRef<Quill|null>(null)
    useEffect(() => {
        if (el.current && !editor.current) {
            const quill = new Quill(el.current, quillOption)
            quill.on('text-change', onTextChange)
            editor.current = quill
        }
    }, [el])

    useEffect(() => {
        const content = getEditorContent()?.replace(/(\r\n|\n|\r)/gm, '')

        if (!content && editor.current && value) {
            const delta: any = markdownToDelta(value)
            editor.current.setContents(delta)
        }
    }, [value])

    useEffect(() => {
        if (!editor.current) return
        if (disabled) {
            editor.current.disable() 
        } else {
            editor.current.enable() 
        }
    }, [disabled])

    function getEditorContent() {
        if (!editor.current) return null
        const htmlContent = editor.current.root.innerHTML
        return converter.makeMarkdown(htmlContent).replaceAll('<br>', '\n')
    }

    function onTextChange() {
        if (editor.current) {
            const content = getEditorContent()
            if (content) onChange(content)
        }
    }

    return (
        <div>
            <div ref={el} style={{height: '300px'}}></div>
        </div>

    )
}


export default QuillEditor