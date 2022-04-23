import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import axios from "axios";
import { $getRoot, $createParagraphNode } from "lexical";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { $createKaraokeNode } from "../decorator-nodes/KaraokeNode";

function MyLoaderPlugin() {
    const [editor] = useLexicalComposerContext();
    const result = useQuery(['data'], () => axios.get('/api/hello'), {
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        if (result.isSuccess) {
            editor.update(() => {
                const root = $getRoot();
                const paragraphNode = $createParagraphNode();
                const textNodes = result.data.data.googleResult[0].results[0].alternatives[0].words.map((item: any) =>  $createKaraokeNode(item));
                paragraphNode.append(...textNodes);
                root.append(paragraphNode);
            });
        }
    }, [editor, result])

    return null;
}

export default React.memo(MyLoaderPlugin);
