import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import React, { useCallback, useEffect, useState } from "react";
import { KaraokeNode } from "../decorator-nodes/KaraokeNode";

dayjs.extend(duration)

function KaraokePlugin() {
    const [editor] = useLexicalComposerContext();
    const [sec, setSec] = useState(0);
    const [timer, setTimer] = useState<NodeJS.Timer | null>(null);

    const onToggleTimer = useCallback(() => {
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
        시간: {dayjs.duration({
            seconds: sec % 60,
            minutes: Math.floor(sec / 60)
        }).format('mm:ss')}초
        <button onClick={onToggleTimer}>{!timer ? '시작' : '정지'}</button>;
    </>
}

export default React.memo(KaraokePlugin);
