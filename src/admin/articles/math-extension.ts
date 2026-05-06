import { Node, mergeAttributes } from '@tiptap/core'
import katex from 'katex'

export interface MathOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    mathematics: {
      /**
       * Insert a math equation inline
       */
      setMathInline: (options: { latex: string }) => ReturnType
    }
  }
}

export const Mathematics = Node.create<MathOptions>({
  name: 'mathematics',

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'math-node',
      },
    }
  },

  group: 'inline',

  inline: true,

  atom: true,

  addAttributes() {
    return {
      latex: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="math"]',
        getAttrs: (dom) => {
          const element = dom as HTMLElement
          return {
            latex: element.getAttribute('data-latex') || element.textContent || '',
          }
        },
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    let rendered = ''
    try {
      rendered = katex.renderToString(node.attrs.latex, { 
        throwOnError: false,
        displayMode: false,
      })
    } catch {
      rendered = node.attrs.latex
    }

    const span = document.createElement('span')
    span.innerHTML = rendered

    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 
      'data-type': 'math',
      'data-latex': node.attrs.latex,
    }), 0]
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const dom = document.createElement('span')
      dom.classList.add('math-node')
      dom.setAttribute('data-type', 'math')
      dom.setAttribute('data-latex', node.attrs.latex)
      dom.contentEditable = 'false'

      const renderMath = (latex: string) => {
        try {
          katex.render(latex, dom, { 
            throwOnError: false,
            displayMode: false,
          })
        } catch {
          dom.textContent = latex
        }
      }

      renderMath(node.attrs.latex)

      // Double click to edit the equation
      dom.addEventListener('dblclick', (e) => {
        e.preventDefault()
        e.stopPropagation()
        const newLatex = window.prompt('Edit equation (LaTeX):', node.attrs.latex)
        if (newLatex !== null && typeof getPos === 'function') {
          editor.chain().focus().command(({ tr }) => {
            const pos = getPos()
            if (typeof pos === 'number') {
              tr.setNodeMarkup(pos, undefined, { latex: newLatex })
            }
            return true
          }).run()
        }
      })

      return { 
        dom,
        update: (updatedNode) => {
          if (updatedNode.type.name !== this.name) return false
          renderMath(updatedNode.attrs.latex)
          dom.setAttribute('data-latex', updatedNode.attrs.latex)
          return true
        },
      }
    }
  },

  addCommands() {
    return {
      setMathInline:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { latex: options.latex },
          })
        },
    }
  },
})
