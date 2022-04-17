import { $getListDepth, $isListItemNode, $isListNode } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    $getSelection,
    $isElementNode,
    $isRangeSelection,
    GridSelection,
    INDENT_CONTENT_COMMAND,
    NodeSelection,
    RangeSelection
} from "lexical";
import { useEffect } from "react";

function getElementNodesInSelection(selection: RangeSelection | NodeSelection | GridSelection | null) {
    const nodesInSelection = selection?.getNodes();

    if (nodesInSelection?.length === 0) {
        return new Set([
            (selection as any)?.anchor.getNode().getParentOrThrow(),
            (selection as any)?.focus.getNode().getParentOrThrow()
        ]);
    }

    return new Set(
        nodesInSelection?.map((n) => ($isElementNode(n) ? n : n.getParentOrThrow()))
    );
}

const highPriority = 3;

function isIndentPermitted(maxDepth: number) {
    const selection = $getSelection();

    if (!$isRangeSelection(selection)) {
        return false;
    }

    const elementNodesInSelection = getElementNodesInSelection(selection);

    let totalDepth = 0;

    for (const elementNode of elementNodesInSelection) {
        if ($isListNode(elementNode)) {
            totalDepth = Math.max($getListDepth(elementNode) + 1, totalDepth);
        } else if ($isListItemNode(elementNode)) {
            const parent = elementNode.getParent();
            if (!$isListNode(parent)) {
                throw new Error(
                    "ListMaxIndentLevelPlugin: A ListItemNode must have a ListNode for a parent."
                );
            }

            totalDepth = Math.max($getListDepth(parent) + 1, totalDepth);
        }
    }

    return totalDepth <= maxDepth;
}

export default function ListMaxIndentLevelPlugin({ maxDepth }: { maxDepth: number }) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            INDENT_CONTENT_COMMAND,
            () => !isIndentPermitted(maxDepth ?? 7),
            highPriority
        );
    }, [editor, maxDepth]);

    return null;
}
