import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useCallback, useEffect, useState } from "react";
import { KaraokeNode } from "../decorator-nodes/KaraokeNode";

function KaraokePlugin() {
    const [editor] = useLexicalComposerContext();
    const [sec, setSec] = useState(0);
    const [timer, setTimer] = useState<NodeJS.Timer | null>(null);

    const foo = useCallback(() => {
        if (!timer) {
            const timer = setInterval(() => {
                setSec(val => val + 1)
            }, 1000);
            setTimer(timer);
        } else {
            clearInterval(timer)
            setTimer(null)
        }
    }, [timer])

    useEffect(() => {
        const removeTransform = editor.registerNodeTransform(KaraokeNode, (textNode: KaraokeNode) => {
            textNode.updateTextColor(sec)
        });
        return removeTransform;
    }, [sec, editor])

    return <>
        {sec}
        <button onClick={foo}>{!timer ? '시작' : '정지'}</button>;
    </>
}

export default React.memo(KaraokePlugin);
