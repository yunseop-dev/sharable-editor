import { NodeKey, EditorConfig, LexicalNode, TextNode, SerializedTextNode } from "lexical";
import React from "react";
import { Spread } from 'libdefs/globals';

interface SecondMeta {
  nanos: number;
  seconds: string;
};
interface Karaoke {
  word: string;
  startTime?: SecondMeta;
  endTime: SecondMeta;
}

export type SerializedKaraokeNode = Spread<
  {
    item: Karaoke;
    type: 'karaoke';
  },
  SerializedTextNode
>;

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

  createDOM(config: EditorConfig) {
    console.log('createDOM');
    const element = super.createDOM(config);
    element.setAttribute('t', this._item?.startTime?.seconds ?? '0');
    return element;
  }

  updateDOM(prevNode: TextNode, dom: HTMLElement, config: EditorConfig): boolean {
    console.log('updateDOM', prevNode, dom);
    this._item.word = prevNode.getTextContent();
    if (this._sec > Number(this._item?.startTime?.seconds ?? '0')) {
      dom.style.color = 'red';
    } else {
      dom.style.removeProperty('color')
    }
    return super.updateDOM(prevNode, dom, config);
  }

  static importJSON(serializedNode: SerializedKaraokeNode): KaraokeNode {
    const node = $createKaraokeNode(
      serializedNode.item
    );
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      item: this.item,
      type: 'karaoke',
    };
  }

  updateTextColor(sec: number) {
    if (sec === this._sec) return;
    this._sec = sec;
  }

  get item() {
    return this._item;
  }

  isTextEntity(): true {
    return true;
  }
}

export function $createKaraokeNode(item: Karaoke): KaraokeNode {
  return new KaraokeNode(item);
}

export function $isKaraokeNode(node: LexicalNode): boolean {
  return node instanceof KaraokeNode;
}
