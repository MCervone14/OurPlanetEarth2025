import React from 'react'

type PayloadNode = {
  type?: string
  text?: string
  children?: PayloadNode[]
  mode?: string
  fields?: {
    title?: string
    url?: string
    newTab?: boolean
    linkType?: string
    blockType?: string
  }
  format?: string
  indent?: number
  version?: number
  direction?: string
}

type PayloadBlock = {
  id?: number
  content: {
    root: PayloadNode
  }
  image?: {
    url?: string
    alt?: string
  }
  blockName?: string
  blockType?: string
}

const SerializedLexical = ({ blocks }: { blocks: PayloadBlock[] }) => {
  const renderNode = (node: PayloadNode): React.ReactNode => {
    switch (node.type) {
      case 'root':
        return node.children?.map((child, i) => (
          <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
        ))

      case 'paragraph':
        return (
          <p className="mb-4 leading-relaxed">
            {node.children?.map((child, i) => (
              <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
            ))}
          </p>
        )

      case 'text':
        return node.text || ''

      case 'link':
        return (
          <a
            href={node.fields?.url}
            className="text-blue-600 hover:text-blue-800 underline"
            target={node.fields?.newTab ? '_blank' : undefined}
            rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}
          >
            {node.children?.map((child, i) => (
              <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
            ))}
          </a>
        )

      case 'quote':
        return (
          <blockquote>
            {node.children?.map((child, i) => (
              <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
            ))}
          </blockquote>
        )

      case 'block':
        if (node?.fields?.blockType === 'video') {
          return (
            <div className="relative w-full pt-[56%]">
              <iframe
                className="w-full h-full absolute top-0 left-0"
                src={node?.fields?.url as string}
                title={(node?.fields?.title as string) || 'Video player'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )
        }

      default:
        return null
    }
  }

  return (
    <div className="rich-text">
      {(blocks as PayloadBlock[]).map((block) => {
        if (block.blockType === 'articleContentWithMedia') {
          return (
            <div key={block.id}>
              {renderNode(block?.content.root)}
              {block.image && (
                <img src={block?.image?.url} alt={block?.image?.alt || ''} className="my-4" />
              )}
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

export default SerializedLexical
