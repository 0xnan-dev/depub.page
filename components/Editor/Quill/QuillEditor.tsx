import Quill from 'quill'
import { FC, useEffect, useRef, } from 'react'
import markdownToDelta from "markdown-to-quill-delta";
import converter from "../../../utils/showdown";
import Debug from 'debug';

const debug = Debug('web:component:QuillEditor')

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

function setupQuillEditor(el: HTMLElement) {
    const quill = new Quill(el, quillOption)
    const filteredAttr = ['color', 'width', 'height']
    quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
        debug(node, delta)
        delta.ops = delta.ops.map(op => {
            const attributes = Object.keys(op.attributes || {} )
                .filter(k => filteredAttr.indexOf(k) === -1)
                .reduce((result: object, key) => {
                    return Object.assign(result, {
                        [key]: (op.attributes || {})[key]
                    })
                }, {})
            return {
                attributes: attributes,
                insert: op.insert
            }
        })
        return delta
    })
    return quill
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
            const quill = setupQuillEditor(el.current)
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

    function getEditorContent(): null | string {
        if (!editor.current) return null
        const htmlContent = editor.current.root.innerHTML
        debug(htmlContent)
        let mdContent = converter.makeMarkdown(htmlContent)
            .replaceAll('<br>', '\n')
            .replaceAll('<!-- -->', '\n')
        mdContent = mdContent.trim()
        debug(mdContent)
        return mdContent
    }

    function onTextChange() {
        if (editor.current) {
            const content = getEditorContent()
            if (content) onChange(content)
        }
    }

    return (
        <div>
            <div ref={el}  style={{height: 'calc(100vh - 140px)' }}></div>
        </div>

    )
}


export default QuillEditor