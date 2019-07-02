import React, { Component, Fragment } from 'react'
import { Editor } from 'slate-react'
import InitialValue from '../utils/InitialValue'

import Icon from 'react-icons-kit'
import { bold, italic, code, list, underline } from 'react-icons-kit/feather'
import { ic_title, ic_format_quote } from 'react-icons-kit/md'

import { FormatToolbar } from './index'

const plugins = [
	MarkHotkey({ key: 'b', type: 'bold' }),
	MarkHotkey({ key: '`', type: 'code' }),
	MarkHotkey({ key: 'i', type: 'italic' }),
	MarkHotkey({ key: '~', type: 'strikethrough' }),
	MarkHotkey({ key: 'u', type: 'underline' }),
	MarkHotkey({ key: 't', type: 'title' }),
	MarkHotkey({ key: 'q', type: 'quote' }),
	MarkHotkey({ key: 'l', type: 'list' }),
  ]

function MarkHotkey(options) {
    const { type, key } = options
  
    // Return our "plugin" object, containing the `onKeyDown` handler.
    return {
      onKeyDown(event, editor, next) {
        // If it doesn't match our `key`, let other plugins handle it.
        if (!event.ctrlKey || event.key !== key) return next()
  
        // Prevent the default characters from being inserted.
        event.preventDefault()
  
        // Toggle the mark `type`
        editor.toggleMark(type)
      },
    }
  }

export default class TextEditor extends Component {
	// Define state
	state = {
		// Import InitialValue from utils
		value: InitialValue,
	};

    // Added ref to editor for change
    ref = editor => { this.editor = editor }

	// Update the app's React state with the new value.
	onChange = ({ value }) => {
		this.setState({ value });
   };

   // Render the view
	render() {
		return (
			<Fragment>
				<FormatToolbar>
					{this.renderMarkIcon('title', ic_title)}
					{this.renderMarkIcon('bold', bold)}
					{this.renderMarkIcon('italic', italic)}
					{this.renderMarkIcon('code', code)}
					{this.renderMarkIcon('list', list)}
					{this.renderMarkIcon('underline', underline)}
					{this.renderMarkIcon('quote', ic_format_quote)}
				</FormatToolbar>
				<Editor
					plugins = {plugins}
					value = {this.state.value}
                    ref = {this.ref}
					onChange = {this.onChange}
					renderMark = {this.renderMark}
				/>
			</Fragment>
		);
	}
	
renderMark = (props, editor, next) => {
    switch (props.mark.type) {
			case 'bold':
			  return <strong>{props.children}</strong>
			// Add our new mark renderers...
			case 'code':
			  return <code>{props.children}</code>
			case 'italic':
			  return <em>{props.children}</em>
			case 'strikethrough':
			  return <del>{props.children}</del>
			case 'underline':
			  return <u>{props.children}</u>
        case 'list':
            return (
                <ul {...props.attributes}>
                    <li>{props.children}</li>
                </ul>
            )  
		case 'quote':
            return <blockquote {...props.attributes}>{props.children}</blockquote>
        case 'title':
            return <h1 {...props.attributes}>{props.children}</h1>
        default:
            return next()
        }
    }
 
	onMarkClick = (event, type) => {
        event.preventDefault()
        this.editor.toggleMark(type)     
	}

	renderMarkIcon = (type, icon) => (
		<button
			onPointerDown={(event) => this.onMarkClick(event, type)}
			className="tooltip-icon-button"
		>
			<Icon icon={icon} />
		</button>
	)
}