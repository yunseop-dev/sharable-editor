import { NodeKey, EditorConfig, LexicalNode, TextNode } from "lexical";
import React from "react";

interface Karaoke {
  word: string;
  endTime: {
    nanos: number;
    seconds: string;
  }
}

interface KaraokeProps {
  text: string;
  time: number;
}

const KaraokeComp = React.memo(function Comp({ text, time } : KaraokeProps) {
  return <span style={{color: 'red'}}>{text}</span>
})

export class KaraokeNode extends TextNode {
  private _item: Karaoke;
  static getType(): string {
    return 'karaoke';
  }

  static clone(node: KaraokeNode): KaraokeNode {
    return new KaraokeNode(node._item, node.__key);
  }

  constructor(item: Karaoke, key?: NodeKey) {
    super(item.word, key);
    this._item = item;
  }
  
  // decorate(editor: LexicalEditor) {
  //   return <KaraokeComp text={this._item.word} time={Number(this._item.endTime.seconds)} />; 
  // }

  updateDOM<EditorContext extends Record<string, any>>(prevNode: TextNode, dom: HTMLElement, config: EditorConfig<EditorContext>): boolean {
    this._item.word = prevNode.getTextContent();
    return super.updateDOM(prevNode, dom, config);
  }
}

export function $createKaraokeNode(item: Karaoke): KaraokeNode {
  return new KaraokeNode(item);
}

export function $isKaraokeNode(node: LexicalNode): boolean {
  return node instanceof KaraokeNode;
}
