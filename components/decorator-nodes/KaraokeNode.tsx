import { NodeKey, EditorConfig, LexicalNode, TextNode } from "lexical";
import React from "react";

interface SecondMeta {
  nanos: number;
  seconds: string;
};
interface Karaoke {
  word: string;
  startTime?: SecondMeta;
  endTime: SecondMeta;
}

export class KaraokeNode extends TextNode {
  private _item: Karaoke;
  private _sec: number = 0;

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

  createDOM<EditorContext extends Record<string, any>>(config: EditorConfig<EditorContext>) {
    const span = document.createElement('span');
    span.textContent = this._item.word;
    span.setAttribute('t', this._item?.startTime?.seconds ?? '0');
    return span
  }

  updateDOM<EditorContext extends Record<string, any>>(prevNode: TextNode, dom: HTMLElement, config: EditorConfig<EditorContext>): boolean {
    this._item.word = prevNode.getTextContent();
    if (this._sec > Number(this._item?.startTime?.seconds ?? '0')) {
      dom.style.color = 'red';
    }
    return super.updateDOM(prevNode, dom, config);
  }

  updateTextColor(sec: number) {
    this._sec = sec;
  }

  get item() {
    return this._item;
  }
}

export function $createKaraokeNode(item: Karaoke): KaraokeNode {
  return new KaraokeNode(item);
}

export function $isKaraokeNode(node: LexicalNode): boolean {
  return node instanceof KaraokeNode;
}
