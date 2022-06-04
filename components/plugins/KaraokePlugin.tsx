import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { KaraokeNode } from "../decorator-nodes/KaraokeNode";
import { useTimer } from 'use-timer';

dayjs.extend(duration)

function KaraokePlugin() {
    const [editor] = useLexicalComposerContext();
    const { time, start, pause, reset, status } = useTimer({
        endTime: 76
    });
    const formattedTime = useMemo(() => dayjs.duration({
        seconds: time % 60,
        minutes: Math.floor(time / 60)
    }).format('mm:ss'), [time]);

    useEffect(() => {
        const removeTransform = editor.registerNodeTransform(KaraokeNode, (textNode: KaraokeNode) => {
            textNode.updateTextColor(time)
        });
        return removeTransform;
    }, [time, editor])

    return <>
        시간: {formattedTime}초
        <button onClick={start} disabled={status === 'RUNNING'}>Start</button>
        <button onClick={pause} disabled={status === 'PAUSED'}>Pause</button>
        <button onClick={reset}>Reset</button>
    </>
}

export default React.memo(KaraokePlugin);
