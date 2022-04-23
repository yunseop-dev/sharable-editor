import ExampleTheme from "./themes/ExampleTheme";
import LexicalComposer from "@lexical/react/LexicalComposer";
import RichTextPlugin from "@lexical/react/LexicalRichTextPlugin";
import ContentEditable from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import AutoFocusPlugin from "@lexical/react/LexicalAutoFocusPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import LexicalOnChangePlugin from '@lexical/react/LexicalOnChangePlugin';
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import LinkPlugin from "@lexical/react/LexicalLinkPlugin";
import ListPlugin from "@lexical/react/LexicalListPlugin";
import LexicalMarkdownShortcutPlugin from "@lexical/react/LexicalMarkdownShortcutPlugin";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import { $getRoot, $getSelection, EditorState } from "lexical";
import MyLoaderPlugin from "./plugins/MyLoaderPlugin";
import React from "react";
import { KaraokeNode } from "./decorator-nodes/KaraokeNode";
import KaraokePlugin from "./plugins/KaraokePlugin";

function Placeholder() {
    return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
    // The editor theme
    theme: ExampleTheme,
    // Handling of errors during update
    onError(error: Error) {
        throw error;
    },
    // Any custom nodes go here
    nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode,
        KaraokeNode
    ]
};

function Editor() {
    function onChange(editorState: EditorState) {
        editorState.read(() => {
            // Read the contents of the EditorState here.
            const root = $getRoot();
            const selection = $getSelection();

            // console.log(root, selection);
        });
    }

    return (
        <LexicalComposer initialConfig={editorConfig}>
            <MyLoaderPlugin />
            <KaraokePlugin />
            <div className="editor-container">
                <ToolbarPlugin />
                <div className="editor-inner">
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="editor-input" />}
                        placeholder={<Placeholder />}
                    />
                    <LexicalOnChangePlugin onChange={onChange} />
                    <HistoryPlugin />
                    <TreeViewPlugin />
                    <AutoFocusPlugin />
                    <ListPlugin />
                    <LinkPlugin />
                    <AutoLinkPlugin />
                    <ListMaxIndentLevelPlugin maxDepth={7} />
                    <LexicalMarkdownShortcutPlugin />
                </div>
            </div>
        </LexicalComposer>
    );
}

export default React.memo(Editor);