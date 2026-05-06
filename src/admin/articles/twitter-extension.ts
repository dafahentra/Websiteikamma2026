import { Node, mergeAttributes } from '@tiptap/core'

export interface TwitterOptions {
  addPastableId: boolean
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    twitter: {
      /**
       * Insert a tweet
       */
      setTweet: (options: { src: string }) => ReturnType
    }
  }
}

export const Twitter = Node.create<TwitterOptions>({
  name: 'twitter',

  addOptions() {
    return {
      addPastableId: false,
      HTMLAttributes: {
        class: 'twitter-embed',
      },
    }
  },

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-twitter]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-twitter': '' })]
  },

  addCommands() {
    return {
      setTweet:
        options =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },
})
